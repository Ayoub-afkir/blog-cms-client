import api from './axios';

export const getPosts = () => api.get("/posts");
export const getPost = (id: number) => api.get(`/posts/${id}`);
export const createPost = (data: any) => api.post("/posts", data);
export const updatePost = (id: number, data: any) =>
  api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);
