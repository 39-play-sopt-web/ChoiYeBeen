import { useState } from 'react';

import * as S from './AuthorizationPage.styles';

import { useIssueAuthorizationCode } from '../../hooks/useIssueAuthorizationCode';
import type { Part } from '../../types/member';

const PARTS: Part[] = ['WEB', 'iOS', 'ANDROID'];

function AuthorizationPage() {
  const [part, setPart] = useState<Part | ''>('');
  const { mutate, isPending } = useIssueAuthorizationCode();

  const handleIssueCode = () => {
    if (!part || isPending) {
      return;
    }

    mutate({ part });
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>회원 코드 발급</S.Title>
        <S.Description>
          파트를 선택하고 게시판에서 사용할 코드를 발급받아 주세요.
        </S.Description>

        <S.PartGroup disabled={isPending}>
          <legend>파트 선택</legend>

          {PARTS.map((item) => (
            <S.PartLabel key={item}>
              <input
                type='radio'
                name='part'
                value={item}
                checked={part === item}
                onChange={() => setPart(item)}
              />
              {item}
            </S.PartLabel>
          ))}
        </S.PartGroup>

        <S.IssueButton
          type='button'
          disabled={!part || isPending}
          onClick={handleIssueCode}
        >
          {isPending ? '발급 중...' : '코드 발급'}
        </S.IssueButton>

        <S.ListLink to='/posts'>게시글 목록으로 이동</S.ListLink>
      </S.Card>
    </S.Container>
  );
}

export default AuthorizationPage;
