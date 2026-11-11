import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../apis/post';

export const usePosts = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'list', 'infinite', keyword],

    initialPageParam: undefined as number | undefined,

    queryFn: ({ pageParam }) =>
      getPosts({
        keyword: keyword || undefined,
        cursor: pageParam,
        size: 10,
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.nextCursor === null) {
        return undefined;
      }

      return lastPage.nextCursor;
    },
  });
};
