import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UpdateShipment from "./components/UpdateShipment";

function Routers() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/update-shipment" element={<UpdateShipment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routers;
