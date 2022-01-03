import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie } from './helpers/cookies';

const UserDashboard = () => {
      let navigate = useNavigate();

      useEffect(() => {
        if (!getCookie("token")) {
          navigate("/");
        }
      }, [navigate]);
    return (
        <div>
            <h1>UserDashboard</h1>
        </div>
    )
}

export default UserDashboard
