import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./1/Home";
import Login from "./1/Login";
import Signup1 from "./1/Signup1";
import Signup2 from "./1/Signup2";
import FindPw from "./1/FindPw";
import ResetPw from "./1/ResetPw";
import Information from "./2/Information";
import Mainscrn from "./2/Mainscrn";
import Profilescrn from "./2/Profilescrn";
import Profile1 from "./2/Profile1";
import Profile2 from "./2/Profile2";
import Fit from "./3/Fit";
import Recommend from "./4/Recommend";
import Video from "./4/Video";
import Save from "./4/Save";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="/information" element={<Information />} />
        <Route path="/main" element={<Mainscrn />} />
        <Route path="/profile" element={<Profilescrn />} />
        <Route path="/inform" element={<Profile1 />} />
        <Route path="/exercise" element={<Profile2 />} />
        <Route path="/fit" element={<Fit />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </Router>
  );
}

export default App;