import http from "./httpServices";

export const signup = (data) => {
  return http.post("/register", data).then((res) => res.data);
};
