import type { MovieListResponse } from '../types/movie';
import { client } from './client';

export const getMovies = async (page: number = 1) => {
  const response = await client.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
    },
  });

  return response.data;
};
