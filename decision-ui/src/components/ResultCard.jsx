import React from 'react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const scorePercentage = Math.round(result.best_option.score);
  let confidenceColor = "var(--primary)";
  if (result.confidence === "High") confidenceColor = "#10b981"; // Emerald Green
  if (result.confidence === "Medium") confidenceColor = "#f59e0b"; // Amber
  if (result.confidence === "Low") confidenceColor = "#ef4444"; // Red

  return (
    <div className="glass-panel" style={{ border: "2px solid rgba(16, 185, 129, 0.4)", boxShadow: "0 20px 50px rgba(16, 185, 129, 0.15)", overflow: "hidden", position: "relative", textAlign: "left" }}>
      
      {/* Decorative background glow */}
      <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(16, 185, 129, 0.15)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", bottom: "-50px", left: "-50px", width: "150px", height: "150px", background: "rgba(249, 115, 22, 0.1)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }}></div>

      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 10 }}>
        <h2 style={{ color: "#10b981", fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "800", margin: "0 0 0.5rem 0" }}>
          Verdict Reached
        </h2>
        <p className="subtext" style={{ fontSize: "1.1rem", margin: 0 }}>Here is the path that makes the most sense.</p>
      </div>
      
      <div className="hover-scale" style={{ background: "linear-gradient(135deg, #ffffff, #f8fafc)", padding: "3rem 2rem", borderRadius: "16px", border: "1px solid rgba(16, 185, 129, 0.2)", textAlign: "center", marginBottom: "2rem", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
        <h3 style={{ fontSize: "3.2rem", margin: "0 0 1.5rem 0", color: "var(--text-primary)", fontWeight: "800", lineHeight: 1.1 }}>
          {result.best_option.option}
        </h3>
        
        <div style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.1)", padding: "0.75rem 2rem", borderRadius: "999px", color: "#10b981", fontWeight: "700", fontSize: "1.25rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          Engine Score: {scorePercentage} / 100
        </div>
      </div>

      <div style={{ marginBottom: "2rem", padding: "0 1rem", position: "relative", zIndex: 10 }}>
        <h4 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text-primary)", fontWeight: "700" }}>Why this option?</h4>
        <p style={{ fontSize: "1.15rem", lineHeight: "1.7", color: "var(--text-secondary)", margin: 0 }}>
          {result.best_option.explanation}
        </p>
      </div>

      <div style={{ background: "rgba(255, 255, 255, 0.6)", padding: "1.5rem", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--glass-border)", position: "relative", zIndex: 10 }}>
        <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>
          Model Confidence
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "120px", height: "8px", background: "rgba(0,0,0,0.05)", borderRadius: "4px", overflow: "hidden" }}>
             <div style={{ 
               height: "100%", 
               background: confidenceColor,
               width: result.confidence === "High" ? "100%" : result.confidence === "Medium" ? "60%" : "30%",
               transition: "width 1s ease-out"
             }}></div>
          </div>
          <strong style={{ color: confidenceColor, fontSize: "1.1rem", width: "60px", textAlign: "right" }}>{result.confidence}</strong>
        </div>
      </div>
    </div>
  );
}