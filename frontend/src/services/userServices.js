import http from "./httpServices";

export const getBasicUserData = () => {
  return http.get("/auth/me").then((res) => res.data);
};

export const getUser = (id, fields = "all") => {
  return http.get(`/users/${id}?fields=${fields}`).then((res) => res.data);
};

export const updateUser = ({id , data}) => {
  return http.patch(`/users/${id}` , data).then((res) => res.data);
};
