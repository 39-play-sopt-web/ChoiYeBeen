import styled from "@emotion/styled";

import { useState } from "react";

function Game() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [nextNumber, setNextNumber] = useState(1);

  function handleNumberClick(number) {
    if (number !== nextNumber) {
      return;
    }

    setNextNumber((prev) => prev + 1);
  }

  return (
    <GameContainer>
      <p>다음 숫자: {nextNumber}</p>

      <Board>
        {numbers.map((number) => (
          <NumberButton
            key={number}
            type="button"
            onClick={() => handleNumberClick(number)}
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  box-shadow: ${({ theme }) => theme.shadow.card};

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;
