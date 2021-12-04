import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function Routers() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routers;
