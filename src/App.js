import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Epp from "./Epp";

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/Epp" element={<Epp/>} />
        </Routes>
    </Router>
  );
}

export default App;