import http from "./httpServices";

export const signup = (data) => {
  return http.post("/register", data).then((res) => res.data);
};

export const verifyEmail = (data) => {
  return http.post("/verifyemail", data).then((res) => res.data);
};

