import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type { GetPostsParams, PostListData } from '../types/post';

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
