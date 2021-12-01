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
    .then((response) => {
      return response.json();
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
