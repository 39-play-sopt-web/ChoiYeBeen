import type { Movie } from '../types/movie';
import {
  Card,
  Poster,
  NoPoster,
  Content,
  Rating,
  Title,
  ReleaseDate,
  Overview,
} from './MovieCard.styles';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card to={`/movie/${movie.id}`}>
      {movie.poster_path ? (
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
        />
      ) : (
        <NoPoster>포스터 없음</NoPoster>
      )}

      <Content>
        <Rating>★ {movie.vote_average.toFixed(1)}</Rating>
        <Title>{movie.title}</Title>
        <ReleaseDate>개봉일: {movie.release_date}</ReleaseDate>
        <Overview>{movie.overview}</Overview>
      </Content>
    </Card>
  );
}
