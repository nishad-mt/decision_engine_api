import { useState } from "react";
import { evaluateDecision } from "../services/api";

export default function EvaluateForm({ decisionId, onResult }) {
  const [form, setForm] = useState({
    energy: 5,
    time_available: 5,
    priority: "fun",
  });
  const [isEvaluating, setIsEvaluating] = useState(false);

  const getEnergyContext = (val) => {
    if (val <= 3) return { text: "Exhausted 🥱", color: "#ef4444" };
    if (val <= 6) return { text: "Okay 🙂", color: "#f59e0b" };
    return { text: "Pumped! ⚡", color: "#10b981" };
  };

  const getTimeContext = (val) => {
    if (val <= 3) return { text: "Rushed ⏱️", color: "#ef4444" };
    if (val <= 6) return { text: "Have a bit ⏳", color: "#f59e0b" };
    return { text: "All day 🕰️", color: "#10b981" };
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEvaluating(true);
    try {
      const res = await evaluateDecision(decisionId, form);
      // Small artificial delay for visual feedback of engine processing
      setTimeout(() => {
        setIsEvaluating(false);
        onResult(res.data);
      }, 700); 
    } catch (err) {
      console.error(err);
      setIsEvaluating(false);
    }
  };

  const energyMeta = getEnergyContext(form.energy);
  const timeMeta = getTimeContext(form.time_available);

  return (
    <div className="glass-panel hover-float" style={{ animationDuration: '8s', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 className="text-gradient" style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Set Context</h2>
          <p className="subtext" style={{ fontSize: "1.1rem" }}>How are you feeling right now?</p>
        </div>

        {/* Energy Input */}
        <div className="glass-card mb-4 hover-scale" style={{ padding: '1.5rem', borderLeft: `4px solid ${energyMeta.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <label style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>Energy Level</label>
            <span style={{ fontWeight: 600, color: energyMeta.color, fontSize: "1.1rem" }}>
              {energyMeta.text} ({form.energy}/10)
            </span>
          </div>
          <input
            type="range"
            name="energy"
            min="1"
            max="10"
            value={form.energy}
            onChange={handleChange}
            style={{ padding: "10px 0" }} // Fixes overlapping thumb
          />
        </div>

        {/* Time Input */}
        <div className="glass-card mb-4 hover-scale" style={{ padding: '1.5rem', borderLeft: `4px solid ${timeMeta.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <label style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>Time Available</label>
            <span style={{ fontWeight: 600, color: timeMeta.color, fontSize: "1.1rem" }}>
              {timeMeta.text} ({form.time_available}/10)
            </span>
          </div>
          <input
            type="range"
            name="time_available"
            min="1"
            max="10"
            value={form.time_available}
            onChange={handleChange}
            style={{ padding: "10px 0" }} // Fixes overlapping thumb
          />
        </div>

        {/* Priority Input */}
        <div className="glass-card mb-8 hover-scale" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
           <label style={{ display: "block", marginBottom: "1rem", fontWeight: 700, fontSize: "1.1rem" }}>Primary Goal Focus</label>
           <select 
             name="priority" 
             className="input select" 
             value={form.priority} 
             onChange={handleChange}
             style={{ fontSize: "1.1rem", padding: "1rem", cursor: "pointer", fontWeight: "500" }}
           >
             <option value="health">💪 Health & Wellness</option>
             <option value="career">💼 Career & Work</option>
             <option value="fun">🎉 Fun & Entertainment</option>
             <option value="social">💬 Social & Relationships</option>
             <option value="finance">💰 Finance</option>
             <option value="growth">🌱 Personal Growth</option>
           </select>
        </div>

        <button 
          type="submit" 
          className="btn w-full hover-lift" 
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))", 
            padding: "1.2rem", 
            fontSize: "1.25rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            border: "none",
            boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)"
          }}
          disabled={isEvaluating}
        >
          {isEvaluating ? (
             <>
               <div className="spinner" style={{ width: "24px", height: "24px", borderWidth: "3px", margin: 0, borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}></div>
               Crunching Data...
             </>
          ) : (
             "🌟 Evaluate Best Option"
          )}
        </button>
      </form>
    </div>
  );
}