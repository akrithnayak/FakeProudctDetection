import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, updateShipment } from "../api/authentication";
import getNavItems from "../helper";
import Navbar from "./Navbar";
import "../css/UpdateShipment.css";

class UpdateShipment extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      productId: "",
      qrcode: "",
      location: "",
      fetchedResults: false,
      message: "",
      formData: new FormData(),
    };
  }

  handleChange(name, event) {
    let value = name === "qrcode" ? event.target.files[0] : event.target.value;
    this.state.formData.set(name, value);
    this.setState({
      [name]: value,
    });
  }

  onSubmit() {
    updateShipment(this.state.formData)
      .then((res) => {
        console.log(res);
        this.setState({
          productId: "",
          qrcode: "",
          location: "",
          fetchedResults: true,
          message: res.msg,
          formData: new FormData(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!isAuthenticated()) {
      return <Navigate to="/sign-in" />;
    }
    return (
      <>
        <Navbar items={getNavItems()} />
        <div className="updateShipmentPage">
          <div className="updateShipment">
            <div className="auth-inner">
              <div>
                <h3 className="logTitle">UPDATE SHIPMENT DETAILS</h3>

                <div className="form-group mt-3">
                  <label>PRODUCT ID</label>
                  <br />
                  <input
                    type="text"
                    className="formInput"
                    placeholder="Enter the product id"
                    name="id"
                    value={this.state.productId}
                    onChange={(e) => this.handleChange("productId", e)}
                  />
                  <h4 className="orr">OR</h4>
                  <input
                    type="file"
                    id="image"
                    name="qrcode"
                    className="m-2"
                    placeholder="Scan QR code"
                    accept="image"
                    onChange={(e) => this.handleChange("qrcode", e)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>LOCATION</label>
                  <br />
                  <input
                    type="text"
                    className="formInput"
                    placeholder="Enter the location"
                    name="location"
                    value={this.state.location}
                    onChange={(e) => this.handleChange("location", e)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn butn btn-dark btn-lg btn-block mt-3"
                  onClick={this.onSubmit}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
          <div
            className="text-success"
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: this.state.fetchedResults ? "flex" : "none",
            }}
          >
            <p className="text-align-center" style={{ color: "white" }}>
              {this.state.message}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateShipment;
