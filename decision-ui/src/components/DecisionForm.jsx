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

  const removeOption = (index) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const addOption = () => {
    if (options[options.length - 1].name.trim() === "") {
      alert("Please give the current option a name first.");
      return;
    }

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
    const validOptions = options.filter(opt => opt.name.trim() !== "");
    if (validOptions.length < 2) {
      alert("Please add at least two valid options to make a decision.");
      return;
    }
    const res = await createDecision({ title, options: validOptions });
    onCreated(res.data.id);
  };

  const lastIdx = options.length - 1;
  const activeOpt = options[lastIdx];
  const savedOptions = options.slice(0, -1);

  return (
    <div className="glass-panel" style={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gradient">Create Decision</h2>
        <p className="subtext mb-4">Start by giving your decision a title and adding the options you're considering.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '3rem' }}>
          
          {/* LEFT COLUMN: Input Form */}
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            <div className="form-group">
              <label>Decision Title</label>
              <input
                className="input"
                style={{fontSize: "1.2rem", padding: "1rem"}}
                placeholder="What are you trying to decide?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <h3 className="mt-8 mb-4">Add Option</h3>
            <div className="glass-card">
              <div className="form-group mb-4">
                <input
                  className="input"
                  style={{fontWeight: "600", borderColor: "var(--primary)"}}
                  placeholder="Option Name (e.g. Go to the beach)"
                  value={activeOpt.name}
                  onChange={(e) =>
                    handleOptionChange(lastIdx, "name", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <div className="custom-tooltip-container mb-2">
                    <label className="custom-tooltip-trigger">Importance: {activeOpt.importance}</label>
                    <span className="custom-tooltip-text">How much does this matter to your long-term goals or well-being? <br/><br/><span style={{opacity: 0.9, fontWeight: 800, fontSize: "0.85rem"}}>1 = Not important, 10 = Extremely critical</span></span>
                  </div>
                  <input
                    type="range"
                    min="1" max="10"
                    value={activeOpt.importance}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "importance", Number(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <div className="custom-tooltip-container mb-2">
                    <label className="custom-tooltip-trigger">Effort: {activeOpt.effort}</label>
                    <span className="custom-tooltip-text">How hard is it to do this physically or mentally? <br/><br/><span style={{opacity: 0.9, fontWeight: 800, fontSize: "0.85rem"}}>1 = Effortless, 10 = Exhausting</span></span>
                  </div>
                  <input
                    type="range"
                    min="1" max="10"
                    value={activeOpt.effort}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "effort", Number(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <div className="custom-tooltip-container mb-2">
                    <label className="custom-tooltip-trigger">Fun: {activeOpt.fun}</label>
                    <span className="custom-tooltip-text">How much immediate enjoyment will you get out of this? <br/><br/><span style={{opacity: 0.9, fontWeight: 800, fontSize: "0.85rem"}}>1 = Boring, 10 = Thrilling</span></span>
                  </div>
                  <input
                    type="range"
                    min="1" max="10"
                    value={activeOpt.fun}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "fun", Number(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <div className="custom-tooltip-container mb-2">
                    <label className="custom-tooltip-trigger">Energy Required: {activeOpt.energy_required}</label>
                    <span className="custom-tooltip-text">How much of your remaining daily energy will this consume? <br/><br/><span style={{opacity: 0.9, fontWeight: 800, fontSize: "0.85rem"}}>1 = None, 10 = All of it</span></span>
                  </div>
                  <input
                    type="range"
                    min="1" max="10"
                     value={activeOpt.energy_required}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "energy_required", Number(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <div className="custom-tooltip-container mb-2">
                    <label className="custom-tooltip-trigger">Time Required: {activeOpt.time_required}</label>
                    <span className="custom-tooltip-text">How much of your available free time will this take? <br/><br/><span style={{opacity: 0.9, fontWeight: 800, fontSize: "0.85rem"}}>1 = Quick, 10 = Very time-consuming</span></span>
                  </div>
                  <input
                    type="range"
                    min="1" max="10"
                    value={activeOpt.time_required}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "time_required", Number(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="input select"
                    value={activeOpt.category}
                    onChange={(e) =>
                      handleOptionChange(lastIdx, "category", e.target.value)
                    }
                  >
                    <option value="health">Health</option>
                    <option value="career">Career</option>
                    <option value="fun">Fun</option>
                    <option value="social">Social</option>
                    <option value="finance">Finance</option>
                    <option value="growth">Growth</option>
                  </select>
                </div>
              </div>

              <button type="button" className="btn btn-secondary mt-4 w-full" onClick={addOption}>
                + Save & Add Another Option
              </button>
            </div>

            <button type="submit" className="btn mt-8 w-full">
              Create Decision
            </button>
          </div>

          {/* RIGHT COLUMN: Saved Options List */}
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            {savedOptions.length > 0 ? (
              <>
                <h3 className="mb-4" style={{ marginTop: '5.5rem' }}>Saved Options</h3>
                <div className="grid">
                  {savedOptions.map((opt, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid var(--primary)', position: 'relative' }}>
                      <button 
                        type="button" 
                        onClick={() => removeOption(i)} 
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', transition: 'transform 0.2s ease'}}
                        className="hover-scale"
                        title="Remove Option"
                      >
                        ✕
                      </button>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary)', paddingRight: '20px' }}>{opt.name}</h4>
                      <div className="subtext" style={{ fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span><strong>Imp:</strong> {opt.importance}</span>
                        <span><strong>Effort:</strong> {opt.effort}</span>
                        <span><strong>Fun:</strong> {opt.fun}</span>
                        <span><strong>Energy:</strong> {opt.energy_required}</span>
                        <span><strong>Time:</strong> {opt.time_required}</span>
                        <span style={{ textTransform: 'capitalize' }}><strong>Cat:</strong> {opt.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div 
                className="center subtext" 
                style={{ 
                  marginTop: '5.5rem', 
                  padding: '2rem', 
                  border: '2px dashed var(--glass-border)', 
                  borderRadius: '16px' 
                }}
              >
                Added options will appear here. Add at least two options to make a decision!
              </div>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}