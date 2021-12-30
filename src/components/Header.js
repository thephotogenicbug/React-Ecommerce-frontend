import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./helpers/auth";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" aria-current="page">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link" aria-current="page">
                    Signin
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && isAuthenticated.role === 0 && (
              <>
                <li className="nav-item">
                  <Link
                    to="/user/dashboard"
                    className="nav-link"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && isAuthenticated.role === 1 && (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin/dashboard"
                    className="nav-link"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() &&  (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin/dashboard"
                    className="nav-link"
                    aria-current="page"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
