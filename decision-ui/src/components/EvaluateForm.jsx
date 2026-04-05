import { useState } from "react";
import { evaluateDecision } from "../services/api";

export default function EvaluateForm({ decisionId, onResult }) {
  const [form, setForm] = useState({
    energy: 5,
    time_available: 5,
    priority: "fun",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await evaluateDecision(decisionId, form);
    onResult(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Evaluate Decision</h3>

      <input
        type="number"
        name="energy"
        placeholder="Energy (1-10)"
        onChange={handleChange}
      />

      <input
        type="number"
        name="time_available"
        placeholder="Time (1-10)"
        onChange={handleChange}
      />

      <select name="priority" onChange={handleChange}>
        <option value="health">Health</option>
        <option value="career">Career</option>
        <option value="fun">Fun</option>
        <option value="social">Social</option>
        <option value="finance">Finance</option>
        <option value="growth">Growth</option>
      </select>

      <button type="submit">Evaluate</button>
    </form>
  );
}