import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nabvar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
