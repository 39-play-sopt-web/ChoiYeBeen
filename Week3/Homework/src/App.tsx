import { useEffect, useState, useRef } from 'react';
import { getMovies } from './apis/movie';
import type { RatingFilter } from './apis/movie';
import type { Movie } from './types/movie';
import MovieCard from './components/MovieCard';
import { Main, MovieGrid, FilterGroup, FilterButton } from './App.styles';

const filters: { label: string; value: RatingFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '9점 이상', value: '9' },
  { label: '8점대', value: '8' },
  { label: '7점대', value: '7' },
  { label: '6점대', value: '6' },
  { label: '6점 미만', value: 'below6' },
];

export default function App() {
  const [filter, setFilter] = useState<RatingFilter>('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 필터나 페이지가 바뀐 뒤 늦게 도착한 이전 응답은 화면에 반영하지 않음
    let active = true;

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getMovies(page, filter);

        if (active) {
          // 첫 페이지는 교체하고 무한 스크롤로 받은 다음 페이지는 뒤에 붙이기
          setMovies((current) =>
            page === 1 ? data.results : [...current, ...data.results],
          );
          setHasMore(data.page < data.total_pages);
        }
      } catch {
        if (active) {
          setError('영화 목록을 불러오지 못했습니다.');
          setHasMore(false);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      active = false;
    };
  }, [page, filter]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 한 번 감지한 뒤 관찰을 멈춰 같은 페이지를 여러 번 요청하지 않음
          observer.disconnect();
          setPage((current) => current + 1);
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [loading, hasMore]);

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
            onClick={() => {
              // 선택된 필터를 다시 누르면 선택을 해제하고 전체 목록으로 돌아감
              const nextFilter = value === filter ? 'all' : value;

              if (nextFilter === filter) return;

              setMovies([]);
              setPage(1);
              setHasMore(true);
              setLoading(true);
              setFilter(nextFilter);
            }}
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
      {loading && <p>영화를 불러오는 중...</p>}
      <div ref={loadMoreRef} />
    </Main>
  );
}
