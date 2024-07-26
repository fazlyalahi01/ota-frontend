import axios from "axios";

export const apiBaseurl = process.env.NEXT_PUBLIC_BACKEND_API;

export const api = axios.create({
  baseURL: `${apiBaseurl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
