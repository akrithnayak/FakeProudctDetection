import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, addProduct } from "../api/authentication";
import Navbar from "./Navbar";

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
        <Navbar
          items={[
            { name: "Search", link: "/" },
            { name: "Add Product", link: "/add-product" },
            { name: "Update Shipment", link: "/update-shipment" },
          ]}
        />
        <div className="pt-5 mt-5">
          <div className="auth-inner">
            <div>
              <h3>Add Product</h3>

              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the product"
                  name="name"
                  value={this.state.productName}
                  onChange={(e) => this.handleChange("productName", e)}
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
          style={{
            display: this.state.productAdded ? "flex" : "none",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div className="card mt-5">
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
      </>
    );
  }
}

export default AddProduct;
