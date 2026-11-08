import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type {
  CreatePostRequest,
  GetPostsParams,
  Post,
  PostListData,
  UpdatePostRequest,
} from '../types/post';

export const getPosts = async (
  params: GetPostsParams = {},
): Promise<PostListData> => {
  const response = await api.get<ApiResponse<PostListData>>('/api/v1/posts', {
    params,
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const createPost = async (request: CreatePostRequest): Promise<Post> => {
  const response = await api.post<ApiResponse<Post>>('/api/v1/posts', request);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const getPost = async (postId: number): Promise<Post> => {
  const response = await api.get<ApiResponse<Post>>(`/api/v1/posts/${postId}`);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const updatePost = async (
  postId: number,
  request: UpdatePostRequest,
): Promise<Post> => {
  const response = await api.put<ApiResponse<Post>>(
    `/api/v1/posts/${postId}`,
    request,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  const response = await api.delete<ApiResponse<null>>(
    `/api/v1/posts/${postId}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
};
