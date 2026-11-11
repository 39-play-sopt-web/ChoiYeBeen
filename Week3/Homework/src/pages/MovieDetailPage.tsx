import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieDetail } from '../apis/movie';
import type { MovieDetail } from '../types/movie';
import {
  Main,
  BackLink,
  Backdrop,
  Hero,
  Poster,
  NoPoster,
  HeroInfo,
  Meta,
  Rating,
  Status,
  Genres,
  Genre,
  Section,
  InfoGrid,
  Info,
} from './MovieDetailPage.styles';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState('');
  const id = Number(movieId);
  const isInvalidId = !Number.isInteger(id) || id <= 0;

  useEffect(() => {
    if (isInvalidId) return;

    // 다른 화면으로 이동한 뒤 도착한 응답은 무시
    let active = true;

    getMovieDetail(id)
      .then((data) => {
        if (active) setMovie(data);
      })
      .catch(() => {
        if (active) setError('영화 정보를 불러오지 못했습니다.');
      });

    return () => {
      active = false;
    };
  }, [id, isInvalidId]);

  return (
    <Main>
      <BackLink to='/'>← 목록으로 돌아가기</BackLink>

      {isInvalidId && <p role='alert'>올바르지 않은 영화 주소입니다.</p>}
      {!isInvalidId && error && <p role='alert'>{error}</p>}
      {!isInvalidId && !movie && !error && <p>불러오는 중...</p>}
      {movie && (
        <>
          <Hero>
            {movie.backdrop_path && (
              <Backdrop
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt=''
              />
            )}
            {movie.poster_path ? (
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
              />
            ) : (
              <NoPoster>포스터 없음</NoPoster>
            )}

            <HeroInfo>
              <h1>{movie.title}</h1>
              <Meta>
                <Rating>★ {movie.vote_average.toFixed(1)}</Rating>
                <span>{movie.release_date || '개봉일 정보 없음'}</span>
                <span>
                  {movie.runtime ? `${movie.runtime}분` : '시간 정보 없음'}
                </span>
                <span>투표 {movie.vote_count.toLocaleString()}명</span>
                <Status>{movie.status}</Status>
              </Meta>
              <Genres>
                {movie.genres.map((genre) => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
              </Genres>
            </HeroInfo>
          </Hero>

          <Section>
            <h2>줄거리</h2>
            <p>{movie.overview || '줄거리 정보가 없습니다.'}</p>
          </Section>

          <Section>
            <h2>기본 정보</h2>
            <InfoGrid>
              <Info>
                <dt>원제</dt>
                <dd>{movie.original_title}</dd>
              </Info>
              <Info>
                <dt>원어</dt>
                <dd>{movie.original_language}</dd>
              </Info>
              <Info>
                <dt>제작 국가</dt>
                <dd>
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(',') || '정보 없음'}
                </dd>
              </Info>
              <Info>
                <dt>사용 언어</dt>
                <dd>
                  {movie.spoken_languages
                    .map((language) => language.name || language.english_name)
                    .join(', ') || '정보 없음'}
                </dd>
              </Info>
              <Info>
                <dt>예산</dt>
                <dd>
                  {movie.budget
                    ? `$${movie.budget.toLocaleString()}`
                    : '정보 없음'}
                </dd>
              </Info>
              <Info>
                <dt>수익</dt>
                <dd>
                  {movie.revenue
                    ? `$${movie.revenue.toLocaleString()}`
                    : '정보 없음'}
                </dd>
              </Info>
            </InfoGrid>
          </Section>
        </>
      )}
    </Main>
  );
}
