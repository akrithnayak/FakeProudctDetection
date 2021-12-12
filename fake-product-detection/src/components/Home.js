import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/authentication";
import { getProduct } from "../api/authentication";
import Navbar from "./Navbar";
import "../css/Home.css";

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
        <Navbar
          items={[
            { name: "Search", link: "/" },
            { name: "Add Product", link: "/add-product" },
            { name: "Update Shipment", link: "/update-shipment" },
          ]}
        />
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
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block m-3"
              onClick={(e) => this.onSubmit(e)}
            >
              Search
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: this.state.fetchedResults ? "flex" : "none",
            }}
          >
            <p
              className="bg-white"
              dangerouslySetInnerHTML={{ __html: this.state.message }}
            ></p>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
