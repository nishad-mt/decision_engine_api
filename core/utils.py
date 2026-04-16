def normalize(weights):
    total = sum(weights)
    if total == 0:
        return weights
    return [w / total for w in weights]


PRIORITY_SIMILARITY = {
    "health": {
        "health": 10, "career": 7, "social": 6, "fun": 5, "finance": 6, "growth": 8
    },
    "career": {
        "career": 10, "finance": 9, "growth": 8, "health": 6, "social": 5, "fun": 4
    },
    "fun": {
        "fun": 10, "social": 8, "health": 5, "career": 4, "finance": 4, "growth": 5
    },
    "social": {
        "social": 10, "fun": 8, "health": 6, "career": 5, "finance": 5, "growth": 6
    },
    "finance": {
        "finance": 10, "career": 9, "growth": 7, "health": 5, "fun": 4, "social": 5
    },
    "growth": {
        "growth": 10, "career": 8, "health": 7, "finance": 6, "social": 6, "fun": 5
    }
}


def match_score(user_value, option_value, tolerance=2):
    diff = abs(user_value - option_value)

    if diff == 0:
        return 10
    elif diff <= tolerance:
        return 8
    elif diff <= tolerance + 2:
        return 5
    else:
        return 2


def calculate_score(option, user_data, weights):
    base_weights, context_weights, final_weights = weights

    # Normalize weights (important)
    base_weights = normalize(base_weights)
    context_weights = normalize(context_weights)
    final_weights = normalize(final_weights)

    # -------------------
    # 1. BENEFIT SCORE
    # -------------------
    benefit_score = (
        option.importance * base_weights[0] +
        option.fun * base_weights[1]
    )

    # -------------------
    # 2. COST SCORE
    # -------------------
    cost_score = (
        option.effort * base_weights[2]
    )

    # -------------------
    # 3. CONTEXT MATCH
    # -------------------
    energy_match = match_score(
        user_data['energy'],
        option.energy_required
    )

    time_match = match_score(
        user_data['time_available'],
        option.time_required
    )

    user_priority = user_data['priority']
    option_category = option.category

    priority_score = PRIORITY_SIMILARITY.get(
        user_priority, {}
    ).get(option_category, 5)

    context_score = (
        energy_match * context_weights[0] +
        time_match * context_weights[1] +
        priority_score * context_weights[2]
    )

    # -------------------
    # 4. NORMALIZATION
    # -------------------
    benefit_score /= 10
    cost_score /= 10
    context_score /= 10

    # -------------------
    # 5. FINAL SCORE
    # -------------------
    final_score = (
        (benefit_score * final_weights[0]) -
        (cost_score * final_weights[1]) +
        (context_score * final_weights[2])
    ) * 10

    # -------------------
    # 6. EXPLANATION
    # -------------------
    reasons = []

    if benefit_score > cost_score:
        reasons.append("benefits outweigh the effort")

    if cost_score > benefit_score:
        reasons.append("high effort compared to benefit")

    if energy_match >= 8:
        reasons.append("fits your current energy")

    if time_match >= 8:
        reasons.append("fits your available time")

    if priority_score >= 8:
        reasons.append("aligns with your priority")

    explanation = ", ".join(reasons) if reasons else "moderate fit"

    return {
        "score": round(final_score, 2),
        "details": {
            "benefit_score": round(benefit_score * 10, 2),
            "cost_score": round(cost_score * 10, 2),
            "context_score": round(context_score * 10, 2),
            "energy_match": energy_match,
            "time_match": time_match,
            "priority_match": priority_score
        },
        "explanation": explanation
    }


def rank_options(decision, user_data, weights):
    results = []

    for option in decision.options.all():
        result = calculate_score(option, user_data, weights)

        results.append({
            "option": option.name,
            "score": result["score"],
            "details": result["details"],
            "explanation": result["explanation"]
        })

    sorted_results = sorted(
        results,
        key=lambda x: (
            x["score"],
            x["details"]["context_score"]
        ),
        reverse=True
    )

    if len(sorted_results) > 1:
        confidence = (
            sorted_results[0]["score"] -
            sorted_results[1]["score"]
        )
    else:
        confidence = 0

    return sorted_results, round(confidence, 2)