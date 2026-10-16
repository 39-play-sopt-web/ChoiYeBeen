import styled from "@emotion/styled";

function Game({ numbers, nextNumber, size, onNumberClick }) {
  return (
    <GameContainer>
      <p>다음 숫자: {nextNumber}</p>

      <Board $size={size}>
        {numbers.map((number, index) => (
          <NumberButton
            key={index}
            type="button"
            disabled={number === null}
            onClick={() => onNumberClick(number, index)}
          >
            {number}
          </NumberButton>
        ))}
      </Board>
    </GameContainer>
  );
}

export default Game;

const GameContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $size }) => $size}, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  max-width: 360px;
`;

const NumberButton = styled.button`
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.text};
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.1s ease,
    background-color 0.1s ease;
  box-shadow: ${({ theme }) => theme.shadow.card};

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &:active {
    // 버튼이 클릭되는 것 같은 효과 (버튼 눌릴 때 크기 줄이기)
    transform: scale(0.8);
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:disabled {
    visibility: hidden;
  }
`;
