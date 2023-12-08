import axios from "axios";
import { BASE_URL } from "./Global";
import { tokenLoader } from "../util/auth";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Function to set the Bearer token dynamically
export const setBearerToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

setBearerToken(tokenLoader());

export default instance;
