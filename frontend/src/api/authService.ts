import api from "./axiosConfig";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("login", data);
  return response.data;
};

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("registrer", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("profile");
  return response.data;
};
