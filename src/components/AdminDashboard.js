import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/category";
import { getCookie } from "./helpers/cookies";
import isEmpty from "validator/lib/isEmpty";
import { ShowErrMsg, ShowSuccessMsg } from "./helpers/message";
import { ShowLoading } from "./helpers/loading";

const AdminDashboard = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleMessages = () =>{
       setErrorMsg('');
       setSuccessMsg('')
       setCategory('')
  }

  const handleCategoryChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setCategory(e.target.value);

    // console.log(category)
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setErrorMsg("Please enter a category");
    } else {
      const data = { category };
      setLoading(true);
      createCategory(data)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
    //console.log(category)
  };

  return (
    <>
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fa fa-home">Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light my-2">
        <div className="container">
          <div className="row mt-2 pb-3 text-center">
            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-info btn-block"
                data-bs-toggle="modal"
                data-bs-target="#addCategoryModal"
                onClick={handleMessages}
              >
                <i className="fa fa-plus"> Add Category</i>
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-warning btn-block">
                <i className="fa fa-plus"> Add Food</i>
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-success btn-block">
                <i className="fa fa-money-check-alt"> View Food</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="addCategoryModal" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleCategorySubmit}>
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Add Category</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body my-2">
                {/* showErrMsg / ShowSuccessMsg() is a method */}
                {errorMsg && ShowErrMsg(errorMsg)}
                {successMsg && ShowSuccessMsg(successMsg)}
                {/* loading ? (Display loading) : (do something else) */}
                {loading ? (
                  <div className="text-center">{ShowLoading()}</div>
                ) : (
                  <>
                    <label className="text-secondary">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-info text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
