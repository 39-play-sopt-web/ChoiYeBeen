export type Part = 'WEB' | 'iOS' | 'ANDROID';

export interface IssueAuthorizationCodeRequest {
  part: Part;
}

export interface AuthorizationCodeData {
  authorizationCode: string;
}
