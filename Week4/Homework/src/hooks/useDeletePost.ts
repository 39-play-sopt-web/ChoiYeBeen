import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { deletePost } from '../apis/post';
import type { ApiResponse } from '../types/api';

export const useDeletePost = (postId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['posts', 'list'],
      });

      navigate('/posts', { replace: true });
    },

    onError: (error) => {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        alert(
          error.response?.data?.message ??
            '게시글 삭제에 실패했어요. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      alert(error.message || '게시글 삭제에 실패했어요.');
    },
  });
};
