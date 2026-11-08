import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import * as S from './Header.styles';

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
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.BrandContainer>
          <S.Logo to='/posts'>
            PLAY SOPT <span>BOARD</span>
          </S.Logo>

          {part && <S.PartBadge>{part} 파트</S.PartBadge>}
        </S.BrandContainer>

        <S.Navigation aria-label='주요 메뉴'>
          <S.MenuLink to='/posts' end>
            게시글 목록
          </S.MenuLink>

          <S.MenuLink to='/posts/new'>글쓰기</S.MenuLink>

          {authorizationCode ? (
            <S.LogoutButton type='button' onClick={handleLogout}>
              로그아웃
            </S.LogoutButton>
          ) : (
            <S.MenuLink to='/'>코드 발급</S.MenuLink>
          )}
        </S.Navigation>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
}

export default Header;
