import { useState, useEffect, useRef } from 'react';
import type { SubmitEvent } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { usePosts } from '../hooks/usePosts';

function PostListPage() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = usePosts(keyword);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const trimmedInput = input.trim();

  const isValidKeyword = trimmedInput.length >= 2 && trimmedInput.length <= 50;

  const showKeywordError = trimmedInput.length > 0 && !isValidKeyword;

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage || isFetching || isFetchNextPageError) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          void fetchNextPage();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetching, isFetchNextPageError, fetchNextPage]);

  const handleSearch = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidKeyword) {
      return;
    }

    setKeyword(trimmedInput);
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    if (!value.trim()) {
      setKeyword('');
    }
  };

  const handleReset = () => {
    setInput('');
    setKeyword('');
  };

  return (
    <Container>
      <Title>게시글 목록</Title>

      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          aria-label='제목 검색어'
          aria-describedby={showKeywordError ? 'search-error' : undefined}
          aria-invalid={showKeywordError}
          placeholder='제목으로 검색'
          maxLength={50}
          value={input}
          onChange={(event) => handleInputChange(event.target.value)}
        />

        <SearchButton type='submit' disabled={!isValidKeyword}>
          검색
        </SearchButton>

        {keyword && (
          <ResetButton type='button' onClick={handleReset}>
            전체 목록
          </ResetButton>
        )}
      </SearchForm>

      {showKeywordError && (
        <ErrorMessage id='search-error'>
          검색어를 2글자 이상 입력해 주세요.
        </ErrorMessage>
      )}

      {keyword && <SearchInfo>검색어: {keyword}</SearchInfo>}

      {isPending ? (
        <StatusMessage role='status'>게시글을 불러오는 중이에요.</StatusMessage>
      ) : isError && !data ? (
        <ErrorBox role='alert'>
          <p>게시글을 불러오지 못했어요.</p>
          <ResetButton type='button' onClick={() => void refetch()}>
            다시 시도
          </ResetButton>
        </ErrorBox>
      ) : (
        <>
          {isFetching && !isFetchingNextPage && (
            <StatusMessage role='status'>목록을 갱신하고 있어요.</StatusMessage>
          )}

          {posts.length === 0 ? (
            <StatusMessage>
              {keyword ? '검색 결과가 없어요.' : '등록된 게시글이 없어요.'}
            </StatusMessage>
          ) : (
            <>
              <PostList>
                {posts.map((post) => (
                  <PostCard key={post.id} to={`/posts/${post.id}`}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>

                    <PostMeta>
                      <Author>{post.author}</Author>
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleString('ko-KR')}
                      </time>
                    </PostMeta>
                  </PostCard>
                ))}
              </PostList>

              <LoadMoreTarget ref={loadMoreRef} aria-hidden='true' />

              {isFetchingNextPage && (
                <StatusMessage role='status'>
                  게시글을 더 불러오는 중이에요.
                </StatusMessage>
              )}

              {isFetchNextPageError && (
                <ErrorBox role='alert'>
                  <p>다음 게시글을 불러오지 못했어요.</p>

                  <ResetButton
                    type='button'
                    disabled={isFetching}
                    onClick={() => void fetchNextPage()}
                  >
                    다시 시도
                  </ResetButton>
                </ErrorBox>
              )}

              {!hasNextPage && (
                <StatusMessage>모든 게시글을 확인했어요.</StatusMessage>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default PostListPage;

const Container = styled.main`
  width: min(100%, 800px);
  margin: 0 auto;
  padding: 48px 24px;
`;

const Title = styled.h1`
  margin: 0 0 24px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: 12px 16px;
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

const SearchButton = styled.button`
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

const ResetButton = styled.button`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

const SearchInfo = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const StatusMessage = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

const ErrorBox = styled.div`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const PostCard = styled(Link)`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
`;

const PostTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
`;

const PostContent = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-wrap;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Author = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const LoadMoreTarget = styled.div`
  height: 1px;
`;
