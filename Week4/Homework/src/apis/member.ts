import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type {
  AuthorizationCodeData,
  IssueAuthorizationCodeRequest,
} from '../types/member';

export const issueAuthorizationCode = async (
  request: IssueAuthorizationCodeRequest,
): Promise<AuthorizationCodeData> => {
  const response = await api.post<ApiResponse<AuthorizationCodeData>>(
    '/api/v1/members/authorization-code',
    request,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};
