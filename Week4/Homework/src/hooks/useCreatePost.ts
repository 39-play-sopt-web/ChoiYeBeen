import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { createPost } from '../apis/post';
import type { ApiResponse } from '../types/api';

export const useCreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: async (post) => {
      await queryClient.invalidateQueries({
        queryKey: ['posts', 'list'],
      });

      alert(`${post.author}님의 게시글이 등록되었어요.`);
      navigate('/posts');
    },

    onError: (error) => {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        alert(
          error.response?.data?.message ??
            '게시글 등록에 실패했어요. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      alert(error.message || '게시글 등록에 실패했어요.');
    },
  });
};
