import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getMovieDetail } from '../apis/movie';
import type { MovieDetail } from '../types/movie';
import styled from 'styled-components';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = Number(movieId);

    if (!Number.isInteger(id) || id <= 0) {
      return;
    }

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
  }, [movieId]);

  return (
    <Main>
        <BackLink to='/'>← 목록으로 돌아가기</BackLink>

        {error && <p role='alert'>{error}</p>}
        {!movie && !error && <p>불러오는 중...</p>}

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
                      .join(',') || '정보 없음'}
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

const Main = styled.main`
  width: min(100% - 48px, 780px);
  margin: 0 auto;
  padding: 40px 0 80px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const Backdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
`;

const Hero = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 280px;
  padding: 28px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Poster = styled.img`
  position: relative;
  width: 160px;
  max-width: 100%;
  height: fit-content;
  border-radius: 8px;
`;

const NoPoster = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 160px;
  min-height: 240px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroInfo = styled.div`
  position: relative;
  min-width: 0;

  h1 {
    margin: 0 0 20px;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

const Rating = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
`;

const Status = styled.span`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.textMuted};
  border-radius: 6px;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Genre = styled.span`
  padding: 5px 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;

const Section = styled.section`
  margin-top: 40px;
  line-height: 1.6;

  h2 {
    margin-bottom: 16px;
  }
`;

const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 0;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Info = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};

  dt {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  dd {
    margin: 0;
  }
`;
