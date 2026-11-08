import { useParams } from 'react-router-dom';
import * as S from './PostDetailPage.styles';
import { useState } from 'react';
import { usePost } from '../../hooks/usePost';
import PostEditForm from '../../components/PostEditForm/PostEditForm';
import { useDeletePost } from '../../hooks/useDeletePost';

function PostDetailPage() {
  const { postId } = useParams();
  const id = Number(postId);

  const isValidId = Number.isSafeInteger(id) && id > 0;

  const { data: post, isPending, isError, refetch } = usePost(id);

  const { mutate: removePost, isPending: isDeleting } = useDeletePost(id);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (!localStorage.getItem('authorizationCode')) {
      alert('먼저 회원 코드를 발급받아 주세요.');
      return;
    }

    setIsEditing(true);
  };

  const handleDelete = () => {
    if (isDeleting) {
      return;
    }

    if (!localStorage.getItem('authorizationCode')) {
      alert('먼저 회원 코드를 발급받아 주세요.');
      return;
    }

    const confirmed = window.confirm('이 게시글을 삭제할까요?');

    if (!confirmed) {
      return;
    }

    removePost();
  };

  if (!isValidId) {
    return (
      <S.Container>
        <S.ListLink to='/posts'>← 목록으로</S.ListLink>
        <S.StatusMessage>올바르지 않은 게시글 주소예요.</S.StatusMessage>
      </S.Container>
    );
  }

  if (isPending) {
    return (
      <S.Container>
        <S.ListLink to='/posts'>← 목록으로</S.ListLink>
        <S.StatusMessage role='status'>게시글을 불러오는 중이에요.</S.StatusMessage>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.ListLink to='/posts'>← 목록으로</S.ListLink>

        <S.ErrorBox role='alert'>
          <p>게시글을 불러오지 못했어요.</p>
          <p>삭제된 게시글이거나 일시적인 오류일 수 있어요.</p>

          <S.RetryButton type='button' onClick={() => void refetch()}>
            다시 시도
          </S.RetryButton>
        </S.ErrorBox>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ListLink to='/posts'>← 목록으로</S.ListLink>

      <S.Article>
        {isEditing ? (
          <PostEditForm
            key={post.id}
            post={post}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <>
            <S.Title>{post.title}</S.Title>

            <S.Meta>
              <S.Author>{post.author}</S.Author>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleString('ko-KR')}
              </time>
            </S.Meta>

            <S.Content>{post.content}</S.Content>

            <S.Actions>
              <S.EditButton
                type='button'
                disabled={isDeleting}
                onClick={handleEdit}
              >
                수정
              </S.EditButton>

              <S.DeleteButton
                type='button'
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </S.DeleteButton>
            </S.Actions>
          </>
        )}
      </S.Article>
    </S.Container>
  );
}

export default PostDetailPage;
