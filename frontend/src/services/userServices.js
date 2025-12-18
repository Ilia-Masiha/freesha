import http from "./httpServices";

export const getUser = () => {
  return http.get("/auth/me").then((res) => res.data);
};