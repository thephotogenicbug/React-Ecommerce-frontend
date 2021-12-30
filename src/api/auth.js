import axios from "axios";

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    "http://localhost:5000/api/auth/signup",
    data,
    config
  );

  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    "http://localhost:5000/api/auth/signin",
    data,
    config
  );

  return response;
};
