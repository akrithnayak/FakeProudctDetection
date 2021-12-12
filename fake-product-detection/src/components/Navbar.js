import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Detect.op
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
