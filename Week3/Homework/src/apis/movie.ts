import type { MovieListResponse } from '../types/movie';
import { client } from './client';

export type RatingFilter = 'all' | '9' | '8' | '7' | '6' | 'below6';

const ratingRanges: Record<
  Exclude<RatingFilter, 'all'>,
  { min?: number; max?: number }
> = {
  '9': { min: 9 },
  '8': { min: 8, max: 8.999 },
  '7': { min: 7, max: 7.999 },
  '6': { min: 6, max: 6.999 },
  below6: { max: 5.999 },
};

export const getMovies = async (
  page: number = 1,
  filter: RatingFilter = 'all',
) => {
  const range = filter === 'all' ? {} : ratingRanges[filter];

  const response = await client.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      'vote_average.gte': range.min,
      'vote_average.lte': range.max,
    },
  });

  return response.data;
};
