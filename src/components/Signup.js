import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from 'validator/lib/equals'
import {ShowErrMsg, ShowSuccessMsg} from './helpers/message';
import { ShowLoading } from './helpers/loading';
import { signup } from '../api/auth';

const Signup = () => {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password2:"",
        successMsg:false,
        errorMsg:false,
        loading:false,
    })
    // destructure formData 
    const {username, email, password, password2, successMsg, errorMsg, loading} = formData

    // Event Handlers
    const handleChange = (e) =>{
        // console.log(e)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            successMsg:'',
            errorMsg:'',
        })
    }

    const handleSubmit = (e) =>{
        // prevent page from loading onSubmit
          e.preventDefault()
           
          // client side validation
          if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
              setFormData({
                  ...formData,
                  errorMsg:"All fields are required"
              })
          }
          else if(!isEmail(email)){
             setFormData({
                 ...formData,
                 errorMsg:"Invalid email"
             })
          }
          else if(!equals(password, password2)){
              setFormData({
                  ...formData,
                  errorMsg:"Password do not match"
              })
          }
          else {
              //success
            const {username, email, password} = formData;
            const data = {username, email, password};

            setFormData({...formData, loading: true});

            signup(data)
              .then((response) => {
                console.log("Signup success", response);
                setFormData({
                  username: "",
                  email: "",
                  password: "",
                  password2: "",
                  loading: false,
                  successMsg: response.data.successMsg,
                });
              })
              .catch((err) => {
                console.log("Signup error", err);
                setFormData({
                  ...formData,
                  loading: false,
                  errorMsg: err.response.data.errorMsg,
                });
              });

          }
    };

    return (
      <div className="container">
        <div className="row">
          <div class="col-md-4"></div>
          <div class="col-md-4 mt-5">
            <p className='text-center text-danger'>{errorMsg && ShowErrMsg(errorMsg)}</p>
            <p className='text-center text-danger'>{successMsg && ShowSuccessMsg(successMsg)}</p>
             <p className='text-center p-b4'>{loading && ShowLoading()}</p>
            <form className="signup-form" noValidate onSubmit={handleSubmit}>
              {/* username */}
              <div className="form-group mb-3 mt-3 input-group">
                <div className="input-group-prepend"></div>
                <input
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={handleChange}
                />
              </div>
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
                  placeholder="Create password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {/* password2 */}
              <div className="form-group mb-3 input-group">
                <div className="input-group-prepend"></div>
                <input
                  name="password2"
                  className="form-control"
                  placeholder="Confirm password"
                  type="password"
                  value={password2}
                  onChange={handleChange}
                />
              </div>
              {/* signup button */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </div>
              {/* already have account */}
              <p className="text-center text-dark">
                Have an account? <Link to="/signin">Log In</Link>
              </p>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
}

export default Signup
