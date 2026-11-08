import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCreatePost } from '../hooks/useCreatePost';

function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const { mutate, isPending } = useCreatePost();

  const authorizationCode = localStorage.getItem('authorizationCode');

  const isTitleValid = title.trim().length > 0 && title.length <= 50;
  const isContentValid = content.trim().length > 0 && content.length <= 1000;
  const isAuthorValid = author.trim().length > 0 && author.length <= 20;

  const isCurrentStepValid =
    step === 1 ? isTitleValid : step === 2 ? isContentValid : isAuthorValid;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCurrentStepValid || isPending || !authorizationCode) {
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (!isTitleValid || !isContentValid || !isAuthorValid) {
      return;
    }

    mutate({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });
  };

  return (
    <Container>
      <Title>게시글 작성</Title>
      <StepInfo>{step} / 3 단계</StepInfo>

      <Form key={step} onSubmit={handleSubmit}>
        {step === 1 && (
          <Field>
            <Label htmlFor='post-title'>제목</Label>
            <Input
              id='post-title'
              autoFocus
              placeholder='제목을 입력해 주세요.'
              maxLength={50}
              value={title}
              required
              disabled={isPending}
              aria-describedby={title.length >= 50 ? 'title-error' : undefined}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Counter>{title.length} / 50</Counter>

            {title.length >= 50 && (
              <ErrorMessage id='title-error'>
                제목은 최대 50글자까지 입력할 수 있어요.
              </ErrorMessage>
            )}
          </Field>
        )}

        {step === 2 && (
          <Field>
            <Label htmlFor='post-content'>본문</Label>
            <Textarea
              id='post-content'
              autoFocus
              placeholder='내용을 입력해 주세요.'
              maxLength={1000}
              value={content}
              required
              disabled={isPending}
              aria-describedby={
                content.length >= 1000 ? 'content-error' : undefined
              }
              onChange={(event) => setContent(event.target.value)}
            />
            <Counter>{content.length} / 1000</Counter>

            {content.length >= 1000 && (
              <ErrorMessage id='content-error'>
                본문은 최대 1,000글자까지 입력할 수 있어요.
              </ErrorMessage>
            )}
          </Field>
        )}

        {step === 3 && (
          <Field>
            <Label htmlFor='post-author'>작성자</Label>
            <Input
              id='post-author'
              autoFocus
              placeholder='이름 또는 닉네임을 입력해 주세요.'
              maxLength={20}
              value={author}
              required
              disabled={isPending}
              aria-describedby={
                author.length >= 20 ? 'author-error' : undefined
              }
              onChange={(event) => setAuthor(event.target.value)}
            />
            <Counter>{author.length} / 20</Counter>

            {author.length >= 20 && (
              <ErrorMessage id='author-error'>
                작성자는 최대 20글자까지 입력할 수 있어요.
              </ErrorMessage>
            )}
          </Field>
        )}

        <Actions>
          <ListLink to='/posts'>목록으로</ListLink>

          {step > 1 && (
            <PreviousButton
              type='button'
              disabled={isPending}
              onClick={() => setStep(step === 3 ? 2 : 1)}
            >
              이전
            </PreviousButton>
          )}

          <SubmitButton
            type='submit'
            disabled={!isCurrentStepValid || isPending}
          >
            {isPending ? '등록 중...' : step === 3 ? '작성' : '다음'}
          </SubmitButton>
        </Actions>
      </Form>
    </Container>
  );
}

export default PostCreatePage;

const Container = styled.main`
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 48px 24px;
`;

const Title = styled.h1`
  margin: 0 0 28px;
`;

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
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

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
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const ListLink = styled(Link)`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
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

const StepInfo = styled.p`
  margin: -12px 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

const PreviousButton = styled.button`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
  }
`;
