import { useEffect, useState } from 'react';
import { getMovies } from './apis/movie';
import type { Movie } from './types/movie';
import styled from 'styled-components';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data.results);
      } catch {
        setError('영화 목록을 불러오지 못했습니다.');
      }
    };

    loadMovies();
  }, []);

  return (
    <Main>
      <h1>영화 둘러보기</h1>
      {error && <p role='alert'>{error}</p>}
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

export default App;
