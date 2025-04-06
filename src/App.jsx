import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainContent />} />
      </Routes>
    </>
  );
}

export default App;
