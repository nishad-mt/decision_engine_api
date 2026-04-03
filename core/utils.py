def normalize(weights):
    total = sum(weights)
    if total == 0:
        return weights
    return [w / total for w in weights]


def calculate_score(option, user_data, weights):
    base_weights, context_weights, final_weights = weights

    base_score = (
        option.importance * base_weights[0] +
        option.fun * base_weights[1] +
        (10 - option.effort) * base_weights[2]
    )

    energy_score = 10 - abs(user_data['energy'] - option.energy_required)
    time_score = 10 - abs(user_data['time_available'] - option.time_required)
    priority_score = 10 if option.category == user_data['priority'] else 5

    context_score = (
        energy_score * context_weights[0] +
        time_score * context_weights[1] +
        priority_score * context_weights[2]
    )

    final_score = (
        base_score * final_weights[0] +
        context_score * final_weights[1]
    )

    return {
        "score": round(final_score, 2),
        "details": {
            "base_score": round(base_score, 2),
            "context_score": round(context_score, 2),
            "energy_match": energy_score,
            "time_match": time_score,
            "priority_match": priority_score
        }
    }


def rank_options(decision, user_data, weights):
    results = []

    for option in decision.options.all():
        result = calculate_score(option, user_data, weights)

        results.append({
            "option": option.name,
            "score": result["score"],
            "details": result["details"]
        })

    return sorted(results, key=lambda x: x["score"], reverse=True)