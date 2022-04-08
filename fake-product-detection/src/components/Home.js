import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/authentication";
import { getProduct } from "../api/authentication";
import Navbar from "./Navbar";
import "../css/Home.css";
import getNavItems from "../helper";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      productId: "",
      qrcode: "",
      fetchedResults: false,
      formData: new FormData(),
      message: "",
    };
  }

  handleChange(name, event) {
    let value = name === "qrcode" ? event.target.files[0] : event.target.value;
    this.state.formData.set(name, value);
    this.setState({
      [name]: value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    getProduct(this.state.formData).then((res) => {
      console.log(res);

      this.setState({
        productId: "",
        qrcode: "",
        fetchedResults: true,
        formData: new FormData(),
        message: res.msg,
      });
    });
  }

  render() {
    if (!isAuthenticated()) {
      return <Navigate to="/sign-in" />;
    }
    return (
      <>
        <Navbar items={getNavItems()} />
        <div className="home">
          <div className="name">
            <h1>DetectOP</h1>
          </div>
          <div className="search">
            <div className="productSearch">
              <input
                type="text"
                name="productId"
                id="productId"
                placeholder="Enter the product Id"
                value={this.state.productId}
                onChange={(e) => this.handleChange("productId", e)}
              />
            </div>
            <p>OR</p>
            <div className="scanCode">
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
          </div>
        </div>
        <div
          className="arrowbox"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="arrow"
            style={{
              display: this.state.fetchedResults ? "flex" : "none",
              position: "absolute",
              bottom: "10%",

              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "35px",
              padding: "0 15px 0 15px",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          >
            &#8595;
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: this.state.fetchedResults ? "flex" : "none",
            backgroundImage:
              "linear-gradient(to left top, #051937, #001b2d, #001a1c, #00160b, #0a0f00);",
          }}
          id="displayBox"
        >
          <p
            className="details"
            style={{
              width: "100%",
              margin: 0,
              padding: "150px",
            }}
            dangerouslySetInnerHTML={{ __html: this.state.message }}
          ></p>
        </div>
        <div className="sub">
          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block m-3 subs"
            onClick={(e) => this.onSubmit(e)}
          >
            SEARCH
          </button>
        </div>
      </>
    );
  }
}

export default Home;
