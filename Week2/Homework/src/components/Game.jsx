import styled from "@emotion/styled";
import shuffle from "../utils/shuffle";

import { useState } from "react";

function Game() {
  // 처음 게임판에 표시될 1~9를 무작위로 배치
  const [numbers, setNumbers] = useState(() =>
    shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  );

  // 다음에 클릭해야 하는 숫자
  const [nextNumber, setNextNumber] = useState(1);

  // 클릭한 칸에 채울 10~18을 미리 섞어서 보관
  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    shuffle([10, 11, 12, 13, 14, 15, 16, 17, 18]),
  );

  function resetGame() {
    setNumbers(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    setRemainingNumbers(shuffle([10, 11, 12, 13, 14, 15, 16, 17, 18]));
    setNextNumber(1);
  }

  function handleNumberClick(number, index) {
    // 순서에 맞지 않는 숫자는 처리 X
    if (number !== nextNumber) {
      return;
    }

    if (number === 18) {
      window.alert("게임 완료!");
      resetGame();
      return;
    }

    // 남은 숫자를 하나 가져오고, 모두 사용했다면 빈칸(null)으로 처리
    const replacement = remainingNumbers[0] ?? null;

    // 클릭한 칸만 교체하고 나머지 칸은 유지
    setNumbers((prev) =>
      prev.map((value, cellIndex) =>
        cellIndex === index ? replacement : value,
      ),
    );

    // 사용한 숫자를 대기 목록에서 제거
    setRemainingNumbers((prev) => prev.slice(1));

    // 다음에 클릭할 숫자로 진행
    setNextNumber((prev) => prev + 1);
  }

  return (
    <GameContainer>
      <p>다음 숫자: {nextNumber}</p>

      <Board>
        {numbers.map((number, index) => (
          <NumberButton
            key={index}
            type="button"
            disabled={number === null}
            onClick={() => handleNumberClick(number, index)}
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

  &:disabled {
    visibility: hidden;
  }
`;
