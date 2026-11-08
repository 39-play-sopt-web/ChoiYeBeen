import { useState, useEffect, useRef } from 'react';
import type { SubmitEvent } from 'react';

import * as S from './PostListPage.styles';

import { usePosts } from '../../hooks/usePosts';

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
    <S.Container>
      <S.Title>게시글 목록</S.Title>

      <S.SearchForm onSubmit={handleSearch}>
        <S.SearchInput
          aria-label='제목 검색어'
          aria-describedby={showKeywordError ? 'search-error' : undefined}
          aria-invalid={showKeywordError}
          placeholder='제목으로 검색'
          maxLength={50}
          value={input}
          onChange={(event) => handleInputChange(event.target.value)}
        />

        <S.SearchButton type='submit' disabled={!isValidKeyword}>
          검색
        </S.SearchButton>

        {keyword && (
          <S.ResetButton type='button' onClick={handleReset}>
            전체 목록
          </S.ResetButton>
        )}
      </S.SearchForm>

      {showKeywordError && (
        <S.ErrorMessage id='search-error'>
          검색어를 2글자 이상 입력해 주세요.
        </S.ErrorMessage>
      )}

      {keyword && <S.SearchInfo>검색어: {keyword}</S.SearchInfo>}

      {isPending ? (
        <S.StatusMessage role='status'>게시글을 불러오는 중이에요.</S.StatusMessage>
      ) : isError && !data ? (
        <S.ErrorBox role='alert'>
          <p>게시글을 불러오지 못했어요.</p>
          <S.ResetButton type='button' onClick={() => void refetch()}>
            다시 시도
          </S.ResetButton>
        </S.ErrorBox>
      ) : (
        <>
          {isFetching && !isFetchingNextPage && (
            <S.StatusMessage role='status'>목록을 갱신하고 있어요.</S.StatusMessage>
          )}

          {posts.length === 0 ? (
            <S.StatusMessage>
              {keyword ? '검색 결과가 없어요.' : '등록된 게시글이 없어요.'}
            </S.StatusMessage>
          ) : (
            <>
              <S.PostList>
                {posts.map((post) => (
                  <S.PostCard key={post.id} to={`/posts/${post.id}`}>
                    <S.PostTitle>{post.title}</S.PostTitle>
                    <S.PostContent>{post.content}</S.PostContent>

                    <S.PostMeta>
                      <S.Author>{post.author}</S.Author>
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleString('ko-KR')}
                      </time>
                    </S.PostMeta>
                  </S.PostCard>
                ))}
              </S.PostList>

              <S.LoadMoreTarget ref={loadMoreRef} aria-hidden='true' />

              {isFetchingNextPage && (
                <S.StatusMessage role='status'>
                  게시글을 더 불러오는 중이에요.
                </S.StatusMessage>
              )}

              {isFetchNextPageError && (
                <S.ErrorBox role='alert'>
                  <p>다음 게시글을 불러오지 못했어요.</p>

                  <S.ResetButton
                    type='button'
                    disabled={isFetching}
                    onClick={() => void fetchNextPage()}
                  >
                    다시 시도
                  </S.ResetButton>
                </S.ErrorBox>
              )}

              {!hasNextPage && (
                <S.StatusMessage>모든 게시글을 확인했어요.</S.StatusMessage>
              )}
            </>
          )}
        </>
      )}
    </S.Container>
  );
}

export default PostListPage;
