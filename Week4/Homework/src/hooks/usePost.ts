import { useQuery } from '@tanstack/react-query';

import { getPost } from '../apis/post';

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: ['posts', 'detail', postId],
    queryFn: () => getPost(postId),
    enabled: Number.isSafeInteger(postId) && postId > 0,
  });
};
