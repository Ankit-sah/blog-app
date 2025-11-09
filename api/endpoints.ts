import { API_BASE_URL } from "@/utils/constants/global";

export const POST = {
  createPost: API_BASE_URL + "/posts",
  getPosts: API_BASE_URL + "/posts",
  getPost: (id: string) => API_BASE_URL + `/posts/${id}`,
  updatePost: (id: string) => API_BASE_URL + `/posts/${id}`,
  deletePost: (id: string) => API_BASE_URL + `/posts/${id}`,
};
