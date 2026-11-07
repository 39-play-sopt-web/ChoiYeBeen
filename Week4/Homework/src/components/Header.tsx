import { NavLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const part = localStorage.getItem('part');
  const authorizationCode = localStorage.getItem('authorizationCode');

  const handleLogout = () => {
    localStorage.removeItem('authorizationCode');
    localStorage.removeItem('part');

    queryClient.clear();

    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <BrandContainer>
          <Logo to='/posts'>
            PLAY SOPT <span>BOARD</span>
          </Logo>

          {part && <PartBadge>{part} 파트</PartBadge>}
        </BrandContainer>

        <Navigation aria-label='주요 메뉴'>
          <MenuLink to='/posts' end>
            게시글 목록
          </MenuLink>

          <MenuLink to='/posts/new'>글쓰기</MenuLink>

          {authorizationCode ? (
            <LogoutButton type='button' onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          ) : (
            <MenuLink to='/'>코드 발급</MenuLink>
          )}
        </Navigation>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled(NavLink)`
  font-size: 20px;
  font-weight: 800;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PartBadge = styled.span`
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
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
