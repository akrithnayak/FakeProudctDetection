import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../api/authentication";
import "../css/Navbar.css";

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
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand nametag" to={"/"}>
            DetectOP
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul
              className="navbar-nav  ml-auto authpage"
              style={{ width: "100%" }}
            >
              {props.items &&
                props.items.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link className="nav-link nametags" to={item.link}>
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
                      className="nav-link btn btn-sm btn-block"
                      style={{
                        borderBottom: "1px solid white",
                        color: "white",
                      }}
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
