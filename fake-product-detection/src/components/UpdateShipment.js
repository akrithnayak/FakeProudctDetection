import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, updateShipment } from "../api/authentication";
import getNavItems from "../helper";
import Navbar from "./Navbar";

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
        <div className="pt-5 mt-5">
          <div className="auth-inner">
            <div>
              <h3>Update Shipment Details</h3>

              <div className="form-group mt-3">
                <label>Product Id</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the product id"
                  name="id"
                  value={this.state.productId}
                  onChange={(e) => this.handleChange("productId", e)}
                />
                <p>OR</p>
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
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the location"
                  name="location"
                  value={this.state.location}
                  onChange={(e) => this.handleChange("location", e)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block mt-3"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div
          className="text-success"
          style={{
            width: "100%",
            justifyContent: "center",
            display: this.state.fetchedResults ? "flex" : "none",
          }}
        >
          <p className="text-align-center">{this.state.message}</p>
        </div>
      </>
    );
  }
}

export default UpdateShipment;
