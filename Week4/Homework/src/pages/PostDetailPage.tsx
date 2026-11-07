import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { usePost } from '../hooks/usePost';
import PostEditForm from '../components/PostEditForm';

function PostDetailPage() {
  const { postId } = useParams();
  const id = Number(postId);

  const isValidId = Number.isSafeInteger(id) && id > 0;

  const { data: post, isPending, isError, refetch } = usePost(id);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (!localStorage.getItem('authorizationCode')) {
      alert('먼저 회원 코드를 발급받아 주세요.');
      return;
    }

    setIsEditing(true);
  };

  if (!isValidId) {
    return (
      <Container>
        <ListLink to='/posts'>← 목록으로</ListLink>
        <StatusMessage>올바르지 않은 게시글 주소예요.</StatusMessage>
      </Container>
    );
  }

  if (isPending) {
    return (
      <Container>
        <ListLink to='/posts'>← 목록으로</ListLink>
        <StatusMessage role='status'>게시글을 불러오는 중이에요.</StatusMessage>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ListLink to='/posts'>← 목록으로</ListLink>

        <ErrorBox role='alert'>
          <p>게시글을 불러오지 못했어요.</p>
          <p>삭제된 게시글이거나 일시적인 오류일 수 있어요.</p>

          <RetryButton type='button' onClick={() => void refetch()}>
            다시 시도
          </RetryButton>
        </ErrorBox>
      </Container>
    );
  }

  return (
    <Container>
      <ListLink to='/posts'>← 목록으로</ListLink>

      <Article>
        {isEditing ? (
          <PostEditForm
            key={post.id}
            post={post}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <>
            <Title>{post.title}</Title>

            <Meta>
              <Author>{post.author}</Author>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleString('ko-KR')}
              </time>
            </Meta>

            <Content>{post.content}</Content>

            <Actions>
              <EditButton type='button' onClick={handleEdit}>
                수정
              </EditButton>
            </Actions>
          </>
        )}
      </Article>
    </Container>
  );
}

export default PostDetailPage;

const Container = styled.main`
  width: min(100%, 800px);
  margin: 0 auto;
  padding: 48px 24px;
`;

const ListLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Article = styled.article`
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
`;

const Title = styled.h1`
  margin: 0 0 16px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

const Author = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
  margin: 32px 0 0;
  white-space: pre-wrap;
  line-height: 1.8;
`;

const StatusMessage = styled.p`
  padding: 32px 0;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

const ErrorBox = styled.div`
  padding: 32px 0;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const EditButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
