import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, login } from "../api/authentication";
import Navbar from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      didRedirect: false,
    };
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    login(this.state)
      .then((res) => {
        console.log(res.msg);

        if (isAuthenticated()) {
          this.setState({
            didRedirect: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  performRedirect() {
    return <Navigate to="/" />;
  }

  render() {
    if (this.state.didRedirect || isAuthenticated()) {
      return this.performRedirect();
    }
    return (
      <>
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <h3>Log in</h3>

              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.name}
                  onChange={(e) => this.handleChange("email", e)}
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

              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block mt-3"
                onClick={(e) => this.onSubmit(e)}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
