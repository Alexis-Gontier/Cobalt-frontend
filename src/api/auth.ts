import axiosClient from "./axiosClient";

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (user: {
  firstname: string;
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosClient.post("/auth/register", user);
  return response.data;
};
