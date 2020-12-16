import React from "react";

import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav class="navbar navbar-expand-lg  home-nav">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="home-nav-link">
          <li className="nav-item active">
            <Link className="nav-link-home" to="/home" style={props.homeActive}>
              Welcome <span class="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              class="nav-link-viewcart"
              to="/ViewCart"
              style={props.ViewCart}
            >
              Message
            </Link>
          </li>
          <li className="nav-item">
            <Link
              class="nav-link-createpost"
              to="/createpost"
              style={props.add}
            >
              Add an offer
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link-search"
              to="/searchpage"
              style={props.search}
            >
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/">
              <button className="homeLogOut" onClick={props.logoutFunction}>
                Sign Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
