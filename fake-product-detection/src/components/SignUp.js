import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, signup } from "../api/authentication";
import Navbar from "./Navbar";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: 2,
      didRedirect: false,
    };
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit() {
    signup(this.state)
      .then((res) => {
        console.log(res.msg);

        this.setState({
          didRedirect: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  performRedirect() {
    if (this.state.didRedirect) {
      return <Navigate to="/sign-in" />;
    }

    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Navbar
          items={[
            { name: "Login", link: "/sign-in" },
            { name: "SignUp", link: "/sign-up" },
          ]}
        />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <h3>Sign Up</h3>

              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange("email", e)}
                />
              </div>

              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange("name", e)}
                />
              </div>

              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange("password", e)}
                />
              </div>

              <div className="form-group mt-3">
                <label>Select your role</label>
                <select
                  className="form-control"
                  name="role"
                  value={this.state.role}
                  onChange={(e) => this.handleChange("role", e)}
                >
                  <option value="-1">Select</option>
                  <option value="2">Consumer</option>
                  <option value="1">Retailer</option>
                  <option value="1">Distributor</option>
                  <option value="0">Manufacturer</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block mt-3"
                onClick={this.onSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    return this.performRedirect();
  }
}

export default SignUp;
