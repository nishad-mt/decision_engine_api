export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div>
      <h2>Recommendation</h2>

      <h3>{result.best_option.option}</h3>
      <p>Score: {result.best_option.score}</p>

      <p>
        <strong>Why?</strong> {result.best_option.explanation}
      </p>

      <p>Confidence: {result.confidence}</p>
    </div>
  );
}