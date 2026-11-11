import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.main`
  width: min(100%, 800px);
  margin: 0 auto;
  padding: 48px 24px;
`;

export const ListLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Article = styled.article`
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
`;

export const Title = styled.h1`
  margin: 0 0 16px;
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export const Author = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.p`
  margin: 32px 0 0;
  white-space: pre-wrap;
  line-height: 1.8;
`;

export const StatusMessage = styled.p`
  padding: 32px 0;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const ErrorBox = styled.div`
  padding: 32px 0;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const EditButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 18px;
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
