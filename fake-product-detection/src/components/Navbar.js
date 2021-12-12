import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../api/authentication";

function Navbar(props) {
  const [loggedIn, setloggedIn] = useState(false);

  const onSubmit = () => {
    if (logout()) {
      setloggedIn(true);
    }
  };

  if (loggedIn) {
    return <Navigate to="/sign-in" />;
  } else
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Detect.op
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav" style={{ width: "100%" }}>
              {props.items &&
                props.items.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link className="nav-link" to={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              {!props.auth ? (
                <>
                  <li className="nav-item" style={{ marginLeft: "auto" }}>
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="nav-link btn btn-danger btn-sm btn-block"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
