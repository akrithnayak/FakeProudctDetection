import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, addProduct } from "../api/authentication";
import getNavItems from "../helper";
import Navbar from "./Navbar";
import "../css/AddProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      productName: "",
      productAdded: false,
      productDetails: {},
    };
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit() {
    console.log(this.state);
    addProduct({ productName: this.state.productName })
      .then((res) => {
        console.log(res);

        this.setState({
          productDetails: res,
          productAdded: true,
          productName: "",
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
        <div className="addProPage">
          <div className=" addProduct">
            <div className="auth-inner">
              <div>
                <h3 className="addProTitle">Add Product</h3>

                <div className="form-group mt-3">
                  <label>NAME</label>
                  <br />
                  <input
                    type="text"
                    className="formInput"
                    placeholder="Enter the product"
                    name="name"
                    value={this.state.productName}
                    onChange={(e) => this.handleChange("productName", e)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn butn btn-dark btn-lg btn-block mt-3"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: this.state.productAdded ? "flex" : "none",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="qrcode"
          >
            <div className="card mt-5 ">
              <img
                src={this.state.productDetails.url}
                alt=""
                height="200px"
                width="200px"
                style={{ margin: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  Product name: {this.state.productDetails.name}
                </h5>
                <h6 className="card-text">
                  Product Id: {this.state.productDetails.id}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddProduct;
