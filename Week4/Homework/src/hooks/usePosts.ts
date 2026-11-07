import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../apis/post';

export const usePosts = (keyword: string) => {
  return useQuery({
    queryKey: ['posts', 'list', keyword],
    queryFn: () =>
      getPosts({
        keyword: keyword || undefined,
        size: 10,
      }),
  });
};
