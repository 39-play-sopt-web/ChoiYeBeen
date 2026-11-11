import { useState } from 'react';
import type { SubmitEvent } from 'react';

import * as S from './PostCreatePage.styles';

import { useCreatePost } from '../../hooks/useCreatePost';

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
    <S.Container>
      <S.Title>게시글 작성</S.Title>
      <S.StepInfo>{step} / 3 단계</S.StepInfo>

      <S.Form key={step} onSubmit={handleSubmit}>
        {step === 1 && (
          <S.Field>
            <S.Label htmlFor='post-title'>제목</S.Label>
            <S.Input
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
            <S.Counter>{title.length} / 50</S.Counter>

            {title.length >= 50 && (
              <S.ErrorMessage id='title-error'>
                제목은 최대 50글자까지 입력할 수 있어요.
              </S.ErrorMessage>
            )}
          </S.Field>
        )}

        {step === 2 && (
          <S.Field>
            <S.Label htmlFor='post-content'>본문</S.Label>
            <S.Textarea
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
            <S.Counter>{content.length} / 1000</S.Counter>

            {content.length >= 1000 && (
              <S.ErrorMessage id='content-error'>
                본문은 최대 1,000글자까지 입력할 수 있어요.
              </S.ErrorMessage>
            )}
          </S.Field>
        )}

        {step === 3 && (
          <S.Field>
            <S.Label htmlFor='post-author'>작성자</S.Label>
            <S.Input
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
            <S.Counter>{author.length} / 20</S.Counter>

            {author.length >= 20 && (
              <S.ErrorMessage id='author-error'>
                작성자는 최대 20글자까지 입력할 수 있어요.
              </S.ErrorMessage>
            )}
          </S.Field>
        )}

        <S.Actions>
          <S.ListLink to='/posts'>목록으로</S.ListLink>

          {step > 1 && (
            <S.PreviousButton
              type='button'
              disabled={isPending}
              onClick={() => setStep(step === 3 ? 2 : 1)}
            >
              이전
            </S.PreviousButton>
          )}

          <S.SubmitButton
            type='submit'
            disabled={!isCurrentStepValid || isPending}
          >
            {isPending ? '등록 중...' : step === 3 ? '작성' : '다음'}
          </S.SubmitButton>
        </S.Actions>
      </S.Form>
    </S.Container>
  );
}

export default PostCreatePage;
