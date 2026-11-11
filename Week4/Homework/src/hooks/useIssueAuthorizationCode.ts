import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { issueAuthorizationCode } from '../apis/member';
import type { ApiResponse } from '../types/api';

export const useIssueAuthorizationCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: issueAuthorizationCode,

    onSuccess: (data, variables) => {
      localStorage.setItem('authorizationCode', data.authorizationCode);
      localStorage.setItem('part', variables.part);

      navigate('/posts');
    },

    onError: (error) => {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        alert(
          error.response?.data?.message ??
            '코드 발급에 실패했어요. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      alert(error.message || '코드 발급에 실패했어요.');
    },
  });
};
