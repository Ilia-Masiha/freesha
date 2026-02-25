import http from "./httpServices";

export const createProject = (data) => {
  return http.post("/job_posts", data).then((res) => res.data);
};

