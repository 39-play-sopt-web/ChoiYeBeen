import styled from 'styled-components';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card>
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

const Card = styled.article`
  overflow: hidden;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Poster = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const NoPoster = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 2 / 3;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Content = styled.div`
  padding: 16px;
`;

const Rating = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

const ReleaseDate = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Overview = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export default MovieCard;
