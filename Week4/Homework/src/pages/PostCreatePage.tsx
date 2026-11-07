import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PostCreatePage() {
  return (
    <Container>
      <h1>게시글 작성</h1>
      <p>이곳에 게시글 작성 폼을 추가할 예정이에요.</p>

      <ListLink to='/posts'>목록으로 이동</ListLink>
    </Container>
  );
}

export default PostCreatePage;

const Container = styled.main`
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 60px 24px;
`;

const ListLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`;
