import { useState } from 'react';
import type { SubmitEvent } from 'react';
import styled from 'styled-components';

import { useUpdatePost } from '../hooks/useUpdatePost';
import type { Post } from '../types/post';

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
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor='edit-title'>제목</Label>

        <Input
          id='edit-title'
          autoFocus
          value={title}
          maxLength={50}
          required
          disabled={isPending}
          aria-describedby={title.length >= 50 ? 'edit-title-limit' : undefined}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Counter>{title.length} / 50</Counter>

        {title.length >= 50 && (
          <LimitMessage id='edit-title-limit'>
            제목은 최대 50글자까지 입력할 수 있어요.
          </LimitMessage>
        )}
      </Field>

      <Field>
        <Label htmlFor='edit-content'>본문</Label>

        <Textarea
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

        <Counter>{content.length} / 1000</Counter>

        {content.length >= 1000 && (
          <LimitMessage id='edit-content-limit'>
            본문은 최대 1,000글자까지 입력할 수 있어요.
          </LimitMessage>
        )}
      </Field>

      <Actions>
        <CancelButton type='button' disabled={isPending} onClick={onClose}>
          취소
        </CancelButton>

        <SaveButton type='submit' disabled={!isValid || isPending}>
          {isPending ? '저장 중...' : '저장'}
        </SaveButton>
      </Actions>
    </Form>
  );
}

export default PostEditForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 240px;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Counter = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  text-align: right;
`;

const LimitMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    opacity: 0.5;
  }
`;

const SaveButton = styled.button`
  padding: 12px 18px;
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
