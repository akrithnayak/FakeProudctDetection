import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, login } from "../api/authentication";
import Navbar from "./Navbar";
import "../css/Login.css";

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

  onSubmit() {
    login(this.state)
      .then((res) => {
        console.log(res.msg);

        if (isAuthenticated())
          this.setState({
            didRedirect: true,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (isAuthenticated() || this.state.didRedirect) {
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
        <div className="login_page">
          <div className="login">
            <div className="auth-inner">
              <div>
                <h3 className="logTitle">LOGIN</h3>

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

                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block mt-3 butn"
                  onClick={this.onSubmit}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
