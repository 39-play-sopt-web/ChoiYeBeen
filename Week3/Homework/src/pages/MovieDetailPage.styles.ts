import styled from 'styled-components';
import { Link } from 'react-router';

export const Main = styled.main`
  width: min(100% - 48px, 780px);
  margin: 0 auto;
  padding: 40px 0 80px;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const Backdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
`;

export const Hero = styled.section`
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

export const Poster = styled.img`
  position: relative;
  width: 160px;
  max-width: 100%;
  height: fit-content;
  border-radius: 8px;
`;

export const NoPoster = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 160px;
  min-height: 240px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeroInfo = styled.div`
  position: relative;
  min-width: 0;

  h1 {
    margin: 0 0 20px;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export const Rating = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
`;

export const Status = styled.span`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.textMuted};
  border-radius: 6px;
`;

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const Genre = styled.span`
  padding: 5px 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;

export const Section = styled.section`
  margin-top: 40px;
  line-height: 1.6;

  h2 {
    margin-bottom: 16px;
  }
`;

export const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 0;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Info = styled.div`
  min-width: 0;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};

  dt {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }
`;
