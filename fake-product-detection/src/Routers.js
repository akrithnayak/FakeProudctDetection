import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./api/authentication";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function Routers() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated() ? <Navbar /> : <Navigate to="/sign-in" />
            }
          />
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routers;
