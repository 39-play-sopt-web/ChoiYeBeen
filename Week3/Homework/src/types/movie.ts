export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  relaase_date: string;
  overview: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
}
