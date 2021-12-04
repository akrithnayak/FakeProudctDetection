import Cookies from "universal-cookie";
const cookies = new Cookies();

const API = "http://localhost:4000";

export const login = (credentials) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      var data = await response.json();
      cookies.set("user", data.resObject);
      return data;
    })
    .catch((err) => console.log(err));
};

export const signup = (credentials) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  return cookies.get("user");
};
