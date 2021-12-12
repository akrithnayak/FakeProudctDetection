import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, signup } from "../api/authentication";
import Navbar from "./Navbar";
import "../css/SignUp.css";

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
          auth={true}
        />
        <div className="signup_page">
          <div className="signup">
            <div className="auth-inner">
              <div>
                <h3 className="logTitle">SIGNUP</h3>

                <div className="form-group mt-3">
                  <label>EMAIL</label>
                  <br />
                  <input
                    type="email"
                    className="formInput"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleChange("email", e)}
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    className="formInput"
                    placeholder="Enter name"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange("name", e)}
                  />
                </div>

                <div className="form-group mt-3">
                  <label>PASSWORD</label>
                  <br />
                  <input
                    type="password"
                    className="formInput"
                    placeholder=""
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange("password", e)}
                  />
                </div>

                <div className="form-group mt-3">
                  <label>SELECT YOUR ROLE</label>
                  <br />
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
                  className="btn butn btn-dark btn-lg btn-block mt-3"
                  onClick={this.onSubmit}
                >
                  SIGNUP
                </button>
              </div>
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
