import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import { ShowLoading } from "./helpers/loading";
import { ShowErrMsg } from "./helpers/message";
import { setAuthentication, isAuthenticated } from "./helpers/auth";

const Signin = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "123456",
    errorMsg: false,
    loading: false,
  });
  const { email, password, errorMsg, loading } = formData;

  // Event Handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    // prevent page from loading onSubmit
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      //success
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      // pass in data as argument
      signin(data)
        // promise based
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirecting to admin dashboard");
            navigate("/admin/dashboard");
          } else {
            console.log("Redirecting to user dashboard");
            navigate("/user/dashboard");
          }
        })
        .catch((err) => {
          console.log("Sign in api function error", err);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 mt-5">
          <p className="text-center text-danger">
            {errorMsg && ShowErrMsg(errorMsg)}
          </p>
          <p className="text-center p-b4">{loading && ShowLoading()}</p>
          <form className="signup-form" noValidate onSubmit={handleSubmit}>
            {/* email */}
            <div className="form-group mb-3 input-group">
              <div className="input-group-prepend"></div>
              <input
                name="email"
                className="form-control"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            {/* password */}
            <div className="form-group mb-3 input-group">
              <div className="input-group-prepend"></div>
              <input
                name="password"
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            {/* signin button */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Signin
              </button>
            </div>
            {/* already have account */}
            <p className="text-center text-dark">
              New User? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Signin;
