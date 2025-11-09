import axios from "./axiosInstance";
import { POST } from "./endpoints";

export const fetchPosts = async () => {
  const response = await axios.get(POST.getPosts);
  return response.data;
};

export const fetchPost = async (id: string) => {
  const response = await axios.get(POST.getPost(id));
  return response.data;
};

export const createPost = async (postData: any) => {
  const response = await axios.post(POST.createPost, postData);
  return response.data;
};

export const updatePost = async (id: string, postData: any) => {
  const response = await axios.put(POST.updatePost(id), postData);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await axios.delete(POST.deletePost(id));
  return response.data;
};
