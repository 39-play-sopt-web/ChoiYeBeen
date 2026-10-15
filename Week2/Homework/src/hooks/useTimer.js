import { useEffect, useRef, useState } from "react";

function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  function clearTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function startTimer() {
    clearTimer();
    startTimeRef.current = performance.now();
    setElapsedTime(0);

    intervalRef.current = setInterval(() => {
      setElapsedTime(performance.now() - startTimeRef.current);
    }, 10);
  }

  function stopTimer() {
    // 시작 전에 stopTimer가 실행되는 경우 막기
    if (startTimeRef.current === null) {
      return 0;
    }

    clearTimer();

    const finalTime = performance.now() - startTimeRef.current;
    setElapsedTime(finalTime);
    startTimeRef.current = null;

    return finalTime;
  }

  function resetTimer() {
    startTimeRef.current = null;
    setElapsedTime(0);
  }

  // 컴포넌트가 사라지면 반복 실행도 정리
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

export default useTimer;
