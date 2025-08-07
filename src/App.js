import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./login/Home";
import Login from "./login/Login";
import Signup1 from "./login/Signup1";
import Signup2 from "./login/Signup2";
import FindPw from "./login/FindPw";
import ResetPw from "./login/ResetPw";
import Information from "./profile/Information";
import Mainscrn from "./profile/Mainscrn";
import Profilescrn from "./profile/Profilescrn";
import Profile1 from "./profile/Profile1";
import Profile2 from "./profile/Profile2";
import Fit from "./fit/Fit";
import Recommend from "./exercise/Recommend";
import Video from "./exercise/Video";
import Save from "./exercise/Save";
//import Logpage from "./exercise/LogPage";

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