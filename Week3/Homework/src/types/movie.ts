export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  original_title: string;
  original_language: string;
  genres: { id: number; name: string }[];
  runtime: number | null;
  vote_count: number;
  status: string;
  production_countries: { name: string }[];
  spoken_languages: { english_name: string; name: string }[];
  budget: number;
  revenue: number;
}
