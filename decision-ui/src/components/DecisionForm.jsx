import { useState } from "react";
import { createDecision } from "../services/api";

export default function DecisionForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([
    {
      name: "",
      importance: 5,
      effort: 5,
      fun: 5,
      energy_required: 5,
      time_required: 5,
      category: "fun",
    },
  ]);

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([
      ...options,
      {
        name: "",
        importance: 5,
        effort: 5,
        fun: 5,
        energy_required: 5,
        time_required: 5,
        category: "fun",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createDecision({
      title,
      options,
    });

    onCreated(res.data.id); // 🔥 pass decision ID
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Decision</h2>

      <input
        placeholder="Decision Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <h3>Options</h3>

      {options.map((opt, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <input
            placeholder="Option name"
            onChange={(e) => handleOptionChange(i, "name", e.target.value)}
          />

          <input type="number" placeholder="Importance"
            onChange={(e) => handleOptionChange(i, "importance", e.target.value)} />

          <input type="number" placeholder="Effort"
            onChange={(e) => handleOptionChange(i, "effort", e.target.value)} />

          <input type="number" placeholder="Fun"
            onChange={(e) => handleOptionChange(i, "fun", e.target.value)} />

          <input type="number" placeholder="Energy"
            onChange={(e) => handleOptionChange(i, "energy_required", e.target.value)} />

          <input type="number" placeholder="Time"
            onChange={(e) => handleOptionChange(i, "time_required", e.target.value)} />

          <select onChange={(e) => handleOptionChange(i, "category", e.target.value)}>
            <option value="health">Health</option>
            <option value="career">Career</option>
            <option value="fun">Fun</option>
            <option value="social">Social</option>
            <option value="finance">Finance</option>
            <option value="growth">Growth</option>
          </select>
        </div>
      ))}

      <button type="button" onClick={addOption}>+ Add Option</button>

      <br /><br />

      <button type="submit">Create Decision</button>
    </form>
  );
}