import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useIssueAuthorizationCode } from '../hooks/useIssueAuthorizationCode';
import type { Part } from '../types/member';

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
    <Container>
      <Card>
        <Title>회원 코드 발급</Title>
        <Description>
          파트를 선택하고 게시판에서 사용할 코드를 발급받아 주세요.
        </Description>

        <PartGroup disabled={isPending}>
          <legend>파트 선택</legend>

          {PARTS.map((item) => (
            <PartLabel key={item}>
              <input
                type='radio'
                name='part'
                value={item}
                checked={part === item}
                onChange={() => setPart(item)}
              />
              {item}
            </PartLabel>
          ))}
        </PartGroup>

        <IssueButton
          type='button'
          disabled={!part || isPending}
          onClick={handleIssueCode}
        >
          {isPending ? '발급 중...' : '코드 발급'}
        </IssueButton>

        <ListLink to='/posts'>게시글 목록으로 이동</ListLink>
      </Card>
    </Container>
  );
}

export default AuthorizationPage;

const Container = styled.main`
  width: min(100%, 560px);
  margin: 0 auto;
  padding: 100px 24px;
`;

const Card = styled.section`
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  margin: 0 0 12px;
`;

const Description = styled.p`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PartGroup = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 0 28px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  legend {
    padding: 0 8px;
  }
`;

const PartLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IssueButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const ListLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
