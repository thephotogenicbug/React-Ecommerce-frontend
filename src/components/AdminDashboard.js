import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./helpers/auth";
import { getCookie } from "./helpers/cookies";

const AdminDashboard = ({key}) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!getCookie('token')) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <h1>AdminDashboard</h1>
    </div>
  );
};

export default AdminDashboard;
