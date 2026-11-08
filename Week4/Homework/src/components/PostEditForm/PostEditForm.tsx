import { useState } from 'react';
import type { SubmitEvent } from 'react';
import * as S from './PostEditForm.styles';

import { useUpdatePost } from '../../hooks/useUpdatePost';
import type { Post } from '../../types/post';

interface PostEditFormProps {
  post: Post;
  onClose: () => void;
}

function PostEditForm({ post, onClose }: PostEditFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { mutate, isPending } = useUpdatePost(post.id);

  const isValid =
    title.trim().length > 0 &&
    title.length <= 50 &&
    content.trim().length > 0 &&
    content.length <= 1000;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid || isPending) {
      return;
    }

    if (!localStorage.getItem('authorizationCode')) {
      alert('먼저 회원 코드를 발급받아 주세요.');
      return;
    }

    mutate(
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Field>
        <S.Label htmlFor='edit-title'>제목</S.Label>

        <S.Input
          id='edit-title'
          autoFocus
          value={title}
          maxLength={50}
          required
          disabled={isPending}
          aria-describedby={title.length >= 50 ? 'edit-title-limit' : undefined}
          onChange={(event) => setTitle(event.target.value)}
        />

        <S.Counter>{title.length} / 50</S.Counter>

        {title.length >= 50 && (
          <S.LimitMessage id='edit-title-limit'>
            제목은 최대 50글자까지 입력할 수 있어요.
          </S.LimitMessage>
        )}
      </S.Field>

      <S.Field>
        <S.Label htmlFor='edit-content'>본문</S.Label>

        <S.Textarea
          id='edit-content'
          value={content}
          maxLength={1000}
          required
          disabled={isPending}
          aria-describedby={
            content.length >= 1000 ? 'edit-content-limit' : undefined
          }
          onChange={(event) => setContent(event.target.value)}
        />

        <S.Counter>{content.length} / 1000</S.Counter>

        {content.length >= 1000 && (
          <S.LimitMessage id='edit-content-limit'>
            본문은 최대 1,000글자까지 입력할 수 있어요.
          </S.LimitMessage>
        )}
      </S.Field>

      <S.Actions>
        <S.CancelButton type='button' disabled={isPending} onClick={onClose}>
          취소
        </S.CancelButton>

        <S.SaveButton type='submit' disabled={!isValid || isPending}>
          {isPending ? '저장 중...' : '저장'}
        </S.SaveButton>
      </S.Actions>
    </S.Form>
  );
}

export default PostEditForm;
