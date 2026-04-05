import { useState } from "react";
import DecisionForm from "./components/DecisionForm";
import EvaluateForm from "./components/EvaluateForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [decisionId, setDecisionId] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Decision Engine</h1>

      {!decisionId ? (
        <DecisionForm onCreated={setDecisionId} />
      ) : (
        <>
          <EvaluateForm decisionId={decisionId} onResult={setResult} />
          <ResultCard result={result} />
        </>
      )}
    </div>
  );
}

export default App;