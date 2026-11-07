import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { updatePost } from '../apis/post';
import type { ApiResponse } from '../types/api';
import type { UpdatePostRequest } from '../types/post';

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdatePostRequest) => updatePost(postId, request),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['posts', 'detail', postId],
          exact: true,
        }),
      ]);

      alert('게시글이 수정되었어요.');
    },

    onError: (error) => {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        alert(
          error.response?.data?.message ??
            '게시글 수정에 실패했어요. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      alert(error.message || '게시글 수정에 실패했어요.');
    },
  });
};
