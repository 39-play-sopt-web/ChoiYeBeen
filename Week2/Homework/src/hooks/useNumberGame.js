import { useState } from "react";
import { shuffle } from "../utils/shuffle";
import { LEVEL_CONFIG } from "../constants/game";
import { createNumbers } from "../utils/createNumbers";
import useTimer from "./useTimer";

function useNumberGame() {
  const { size, maxNumber } = LEVEL_CONFIG[1];
  const cellCount = size * size;
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();

  // 처음 게임판에 표시될 1~9를 무작위로 배치
  const [numbers, setNumbers] = useState(() =>
    shuffle(createNumbers(1, cellCount)),
  );

  // 다음에 클릭해야 하는 숫자
  const [nextNumber, setNextNumber] = useState(1);

  // 클릭한 칸에 채울 10~18을 미리 섞어서 보관
  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    shuffle(createNumbers(cellCount + 1, maxNumber - cellCount)),
  );

  function resetGame() {
    setNumbers(shuffle(createNumbers(1, cellCount)));
    setRemainingNumbers(
      shuffle(createNumbers(cellCount + 1, maxNumber - cellCount)),
    );
    setNextNumber(1);
    resetTimer();
  }

  function handleNumberClick(number, index) {
    if (number === 1) {
      startTimer();
    }

    // 순서에 맞지 않는 숫자는 처리 X
    if (number !== nextNumber) {
      return;
    }

    if (number === maxNumber) {
      const finalTime = stopTimer();

      window.alert(`게임 완료! ${(finalTime / 1000).toFixed(2)}초`);
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

  return {
    numbers,
    nextNumber,
    size,
    elapsedTime,
    handleNumberClick,
  };
}

export default useNumberGame;
