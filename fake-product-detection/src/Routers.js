import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function Routers() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routers;
