import styled from 'styled-components';
import { Link } from 'react-router';

export const Card = styled(Link)`
  color: inherit;
  text-decoration: none;

  overflow: hidden;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Poster = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

export const NoPoster = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 2 / 3;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Rating = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

export const ReleaseDate = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Overview = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
