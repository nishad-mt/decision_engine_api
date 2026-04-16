import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DecisionPage from "./pages/DecisionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/decisions" element={<DecisionPage />} />
      </Routes>
    </Router>
  );
}

export default App;