import styled from 'styled-components';
import { Link } from 'react-router';

export const Container = styled.main`
  width: min(100%, 800px);
  margin: 0 auto;
  padding: 48px 24px;
`;

export const Title = styled.h1`
  margin: 0 0 24px;
`;

export const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const ResetButton = styled.button`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

export const SearchInfo = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StatusMessage = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const ErrorBox = styled.div`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export const PostCard = styled(Link)`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
`;

export const PostTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
`;

export const PostContent = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-wrap;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Author = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const LoadMoreTarget = styled.div`
  height: 1px;
`;
