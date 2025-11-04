import axios from "axios"


const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
};

export default http;