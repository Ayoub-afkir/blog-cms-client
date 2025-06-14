import api from './axios';

export const login = async (email: string, password: string) => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/login", { email, password });
};
