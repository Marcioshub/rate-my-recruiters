import axios from "axios";

// register user
const register = async (userData) => {
  const response = await axios.post("/api/users/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login
const login = async (userData) => {
  const response = await axios.post("/api/users/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout
const logout = () => localStorage.removeItem("user");

// create review
const create = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios
    .post("/api/reviews/create", userData, config)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);

        return { data: error.response.data };
      }
    });

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  create,
};

export default authService;
