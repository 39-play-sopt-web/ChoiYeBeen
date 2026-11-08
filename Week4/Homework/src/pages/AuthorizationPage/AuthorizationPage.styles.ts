import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.main`
  width: min(100%, 560px);
  margin: 0 auto;
  padding: 100px 24px;
`;

export const Card = styled.section`
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Title = styled.h1`
  margin: 0 0 12px;
`;

export const Description = styled.p`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PartGroup = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 0 28px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  legend {
    padding: 0 8px;
  }
`;

export const PartLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const IssueButton = styled.button`
  width: 100%;
  padding: 14px;
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

export const ListLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
