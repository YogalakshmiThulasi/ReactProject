import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import NewPage from "./New";
import WomenPage from "./Women";
import MenPage from "./Men";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/men" element={<MenPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
