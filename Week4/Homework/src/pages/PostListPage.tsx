import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PostListPage() {
  return (
    <Container>
      <h1>게시글 목록</h1>
      <p>다음 단계에서 게시글 목록과 검색을 구현할 거예요.</p>
      <Link to='/'>회원 코드 발급 페이지로 이동</Link>
    </Container>
  );
}

export default PostListPage;

const Container = styled.main`
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 60px 24px;

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
