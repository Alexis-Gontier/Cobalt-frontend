import axiosConfig from "./axiosConfig";

export const login = async (email: string, password: string) => {
  const response = await axiosConfig.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (user: {
  firstname: string;
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosConfig.post("/auth/register", user);
  return response.data;
};
