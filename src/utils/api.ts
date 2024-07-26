import axios from "axios";
import Cookies from 'js-cookie';


export const apiBaseurl = process.env.NEXT_PUBLIC_BACKEND_API;

export const api = axios.create({
  baseURL: `${apiBaseurl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});


const getToken = () => {
  return Cookies.get('token');
};

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers["auth-Token"] = `${token}`;
  }
  return config;
},
  (error) => {    
    return Promise.reject(error);
  }
);