import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type {
  CreatePostRequest,
  GetPostsParams,
  Post,
  PostListData,
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
