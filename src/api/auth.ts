import api from './axios';

export const login = async (email: string, password: string) => {
  const response = await api.post("login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.access_token);

  return response;
};
