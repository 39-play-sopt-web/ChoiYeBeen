import { useEffect, useState } from 'react';
import { getMovies } from './apis/movie';
import type { RatingFilter } from './apis/movie';
import type { Movie } from './types/movie';
import styled from 'styled-components';
import MovieCard from './components/MovieCard';

const filters: { label: string; value: RatingFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '9점 이상', value: '9' },
  { label: '8점대', value: '8' },
  { label: '7점대', value: '7' },
  { label: '6점대', value: '6' },
  { label: '6점 미만', value: 'below6' },
];

function App() {
  const [filter, setFilter] = useState<RatingFilter>('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadMovies = async () => {
      try {
        setError('');
        setMovies([]);

        const data = await getMovies(1, filter);

        if (active) {
          setMovies(data.results);
        }
      } catch {
        if (active) {
          setError('영화 목록을 불러오지 못했습니다.');
        }
      }
    };

    loadMovies();

    return () => {
      active = false;
    };
  }, [filter]);

  return (
    <Main>
      <h1>영화 둘러보기</h1>
      <FilterGroup aria-label='평점 필터'>
        {filters.map(({ label, value }) => (
          <FilterButton
            key={value}
            type='button'
            $selected={filter === value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterGroup>
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

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button<{ $selected: boolean }>`
  padding: 8px 14px;
  border: 0;
  border-radius: 20px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background : theme.colors.text};
  cursor: pointer;
`;

export default App;
