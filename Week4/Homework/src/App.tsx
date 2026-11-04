import styled from 'styled-components';

function App() {
  return (
    <Container>
      <Title>PLAY SOPT BOARD</Title>
      <Description>게시판을 만들 준비가 되었어요.</Description>
      <Button type='button'>설정 완료</Button>
    </Container>
  );
}

export default App;

const Container = styled.main`
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 80px 24px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
