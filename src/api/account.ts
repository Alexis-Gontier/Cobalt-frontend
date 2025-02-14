import axiosConfig from "./axiosConfig";

export const updateAccount = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const response = await axiosConfig.put("/auth/modifyAccount", data);
  return response.data;
};

export const updatePassword = async (data: {
  current: string;
  new: string;
}) => {
  const response = await axiosConfig.put("/auth/modifyPassword", data);
  return response.data;
};
