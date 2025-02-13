import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://15.237.52.83",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosConfig