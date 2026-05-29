import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Selection } from "./pages/Selection";
import { AutoPlay } from "./pages/AutoPlay";
import { Assist } from "./pages/Assist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/autoplay" element={<AutoPlay />} />
        <Route path="/assist" element={<Assist />} />
      </Routes>
    </Router>
  );
}

export default App
