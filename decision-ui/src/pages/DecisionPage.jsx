import { useState } from "react";
import DecisionForm from "../components/DecisionForm";
import EvaluateForm from "../components/EvaluateForm";
import ResultCard from "../components/ResultCard";

export default function DecisionPage() {
  const [decisionId, setDecisionId] = useState(null);
  const [result, setResult] = useState(null);
  const [formKey, setFormKey] = useState(Date.now());
  
  // Phase Routing
  // 1 = Brainstorm, 2 = Context, 3 = Result
  const currentPhase = result ? 3 : decisionId ? 2 : 1;

  const startNewDecision = () => {
    setDecisionId(null);
    setResult(null);
    setFormKey(Date.now()); // Forces form state wipe
  };

  const editExistingOptions = () => {
    setDecisionId(null);
    setResult(null);
    // Keeps formKey untouched so state is preserved
  };

  return (
    <div className="main-container" style={{ paddingBottom: "4rem", minHeight: "100vh", position: "relative" }}>
      
      {/* Background Ambience */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100vw", height: "400px", background: "radial-gradient(ellipse at top, rgba(249, 115, 22, 0.08), transparent 70%)", zIndex: 0, pointerEvents: "none" }}></div>

      <div style={{ textAlign: "center", marginBottom: "3rem", paddingTop: "2rem", position: "relative", zIndex: 1 }}>
         <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "0.6rem 1.2rem", background: "rgba(249, 115, 22, 0.1)", borderRadius: "999px", color: "var(--primary)", fontWeight: "700", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.5rem", border: "1px solid rgba(249, 115, 22, 0.2)"}}>
           <span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", boxShadow: "0 0 10px var(--primary)", animation: "pulse 2s infinite" }}></span>
           Live Workspace
         </div>

         <h1 style={{fontSize: "3.8rem", margin: "0", fontWeight: "900", color: "var(--text-primary)", letterSpacing: "-1.5px", lineHeight: 1.1}}>
           The <span className="text-gradient">Decision</span> Engine
         </h1>
      </div>
      
      {/* Premium Stepper Wizard Header */}
      <div className="glass-panel hover-float" style={{ animationDuration: "10s", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto 4rem", padding: "1.5rem 3rem", maxWidth: "700px", borderRadius: "24px", position: "relative", zIndex: 1 }}>
         
         {/* Step 1 */}
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", zIndex: 2, position: "relative", width: "80px" }}>
            <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: currentPhase >= 1 ? "var(--primary)" : "var(--glass-border)", color: currentPhase >= 1 ? "#fff" : "var(--text-secondary)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "800", fontSize: "1.2rem", transition: "all 0.4s ease", boxShadow: currentPhase === 1 ? "0 0 25px rgba(249, 115, 22, 0.5)" : "none" }}>
               1
            </div>
            <span style={{ fontWeight: currentPhase === 1 ? 800 : 600, color: currentPhase >= 1 ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.3s ease" }}>Options</span>
         </div>

         {/* Connector 1 */}
         <div style={{ flex: 1, height: "4px", background: currentPhase >= 2 ? "var(--primary)" : "var(--glass-border)", margin: "0 0.5rem", borderRadius: "2px", transition: "all 0.5s ease", transform: "translateY(-14px)" }}></div>

         {/* Step 2 */}
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", zIndex: 2, position: "relative", width: "80px" }}>
            <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: currentPhase >= 2 ? "var(--primary)" : "var(--glass-bg)", border: currentPhase >= 2 ? "none" : "2px solid var(--glass-border)", color: currentPhase >= 2 ? "#fff" : "var(--text-secondary)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "800", fontSize: "1.2rem", transition: "all 0.4s ease", boxShadow: currentPhase === 2 ? "0 0 25px rgba(249, 115, 22, 0.5)" : "none" }}>
               2
            </div>
            <span style={{ fontWeight: currentPhase === 2 ? 800 : 600, color: currentPhase >= 2 ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.3s ease" }}>Context</span>
         </div>

         {/* Connector 2 */}
         <div style={{ flex: 1, height: "4px", background: currentPhase >= 3 ? "#10b981" : "var(--glass-border)", margin: "0 0.5rem", borderRadius: "2px", transition: "all 0.5s ease", transform: "translateY(-14px)" }}></div>

         {/* Step 3 */}
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", zIndex: 2, position: "relative", width: "80px" }}>
            <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: currentPhase >= 3 ? "#10b981" : "var(--glass-bg)", border: currentPhase >= 3 ? "none" : "2px solid var(--glass-border)", color: currentPhase >= 3 ? "#fff" : "var(--text-secondary)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "800", fontSize: "1.2rem", transition: "all 0.4s ease", boxShadow: currentPhase === 3 ? "0 0 25px rgba(16, 185, 129, 0.5)" : "none" }}>
               3
            </div>
            <span style={{ fontWeight: currentPhase === 3 ? 800 : 600, color: currentPhase === 3 ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.3s ease" }}>Verdict</span>
         </div>

      </div>

      <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        
        <div className="fade-in" style={{ width: "100%", display: currentPhase === 1 ? "block" : "none" }}>
          <DecisionForm key={formKey} onCreated={setDecisionId} />
        </div>

        {currentPhase === 2 && (
          <div className="fade-in center" style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <EvaluateForm decisionId={decisionId} onResult={setResult} />
          </div>
        )}

        {currentPhase === 3 && (
          <div className="fade-in center" style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
            <ResultCard result={result} />
            <div className="mt-8 center" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button 
                className="btn btn-secondary hover-scale" 
                onClick={editExistingOptions}
                style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
              >
                ✏️ Edit Options
              </button>
              <button 
                className="btn hover-scale" 
                onClick={startNewDecision}
                style={{ padding: "1rem 2rem", fontSize: "1.1rem", border: "none", boxShadow: "0 5px 15px rgba(249, 115, 22, 0.3)" }}
              >
                ✨ New Decision
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}