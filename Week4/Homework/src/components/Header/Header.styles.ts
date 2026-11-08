import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Logo = styled(NavLink)`
  font-size: 20px;
  font-weight: 800;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PartBadge = styled.span`
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MenuLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LogoutButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
