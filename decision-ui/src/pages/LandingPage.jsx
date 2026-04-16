import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentHeadingIdx, setCurrentHeadingIdx] = useState(0);
  const headings = [
    "Start Deciding.",
    "Stop Overthinking.",
    "Take Action.",
    "Find Clarity."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIdx((prev) => (prev + 1) % headings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headings.length]);

  const [activeDilemma, setActiveDilemma] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  const dilemmas = [
    { id: 1, text: "I should study… but I’m tired.", icon: "😵‍💫", result: "Energy is low. Take a 20 min power nap, then do 40 mins of focused study to maximize retention." },
    { id: 2, text: "I want to go out… but I have work.", icon: "🤔", result: "High priority task pending. Work for 90 mins, then reward yourself with a quick guilt-free outing." },
    { id: 3, text: "Cook or Order Food?", icon: "🍕", result: "Time is ample but motivation is low. Find a 15-minute low-effort recipe to build momentum and save money." }
  ];

  const handleDilemmaClick = (d) => {
    if (activeDilemma?.id === d.id && !isEvaluating) return;
    setActiveDilemma(d);
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="main-container relative overflow-hidden" style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background glowing orbs */}
      <div className="glow-orb" style={{ top: '-10%', left: '-10%', background: 'var(--primary)', animationDelay: '0s' }}></div>
      <div className="glow-orb" style={{ bottom: '-10%', right: '-5%', background: 'var(--secondary)', animationDelay: '2s' }}></div>

      <div className="grid grid-2" style={{ gap: '3rem', maxWidth: '1100px', width: '100%', margin: '0 auto', alignItems: 'center' }}>
        
        {/* Left: Hero Info */}
        <section className="relative z-10" style={{ textAlign: "left", padding: 0 }}>
          <h1 className="hero-title" style={{ fontSize: "4.5rem", marginBottom: "1rem", lineHeight: 1.05 }}>
            Stop Guessing.<br />
            <span className="text-gradient dynamic-text" key={currentHeadingIdx}>
              {headings[currentHeadingIdx]}
            </span>
          </h1>

          <p className="subtext" style={{ fontSize: "1.2rem", maxWidth: "450px", margin: "0 0 2.5rem 0", lineHeight: 1.6 }}>
            Whether it's studying, working out, or taking a break — the Decision Engine evaluates your current constraints to suggest the optimal next step immediately.
          </p>

          <button
            className="btn btn-primary-glow hover-lift"
            onClick={() => navigate("/decisions")}
            style={{ padding: "1.2rem 3rem", fontSize: "1.2rem" }}
          >
            Launch Engine <span className="arrow-icon">→</span>
          </button>
        </section>

        {/* Right: Interactive Demo */}
        <section className="relative z-10" style={{ padding: 0 }}>
          <div className="glass-panel" style={{ padding: "2rem", border: "1px solid rgba(249, 115, 22, 0.3)" }}>
             <h3 className="text-gradient center" style={{ margin: "0 0 1.5rem 0", fontSize: "1.6rem" }}>Try a Quick Demo</h3>
             
             <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
               <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                  {dilemmas.map((d) => (
                    <div 
                      key={d.id} 
                      className={`glass-card dilemma-card hover-scale ${activeDilemma?.id === d.id ? 'active' : ''}`}
                      onClick={() => handleDilemmaClick(d)}
                      style={{ flex: "1 1 30%", minWidth: "100px", padding: "0.75rem", margin: 0, flexDirection: "column", gap: "0.25rem", textAlign: "center" }}
                    >
                      <div className="dilemma-icon" style={{ fontSize: "1.5rem" }}>{d.icon}</div>
                      <div className="dilemma-text" style={{ fontSize: "0.85rem", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{d.text}</div>
                    </div>
                  ))}
               </div>

               <div className="demo-result-panel glass-card" style={{ minHeight: "160px", margin: "0", display: "flex", alignItems: "center", justifyContent: "center", border: "none", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)" }}>
                  {!activeDilemma ? (
                    <div className="empty-state">
                      <div className="pulse-icon" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👆</div>
                      <p style={{ margin: 0, fontSize: "1rem" }}>Select a dilemma to evaluate</p>
                    </div>
                  ) : isEvaluating ? (
                    <div className="evaluating-state" style={{ padding: 0 }}>
                      <div className="spinner" style={{ width: "30px", height: "30px", marginBottom: "0.75rem" }}></div>
                      <p style={{ fontWeight: 600, color: "var(--primary)", margin: 0 }}>Analyzing Context...</p>
                      <div className="progress-bar-container" style={{ width: "70%", height: "4px", margin: "10px auto 0" }}>
                        <div className="progress-bar" style={{ animationDuration: "1.2s" }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="result-state fade-in" style={{ textAlign: "center", padding: "0 1rem" }}>
                      <h4 style={{ color: "var(--primary)", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Recommendation</h4>
                      <p style={{ fontWeight: 500, fontSize: "1.05rem", lineHeight: "1.5", margin: 0 }}>{activeDilemma.result}</p>
                    </div>
                  )}
               </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}