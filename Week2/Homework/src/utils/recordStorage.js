import { RECORD_STORAGE_KEY } from "../constants/game";

// 저장된 배열 읽기, 없으면 빈 배열 반환
export function getRecords() {
  const savedRecords = localStorage.getItem(RECORD_STORAGE_KEY);

  return JSON.parse(savedRecords) ?? [];
}

// 기존 기록에 새 기록 추가
export function addRecord(record) {
  const records = getRecords();

  // localStorage는 문자열을 저장 -> JSON.stringify로 배열을 문자열로 바꾸고 parse로 다시 읽기
  localStorage.setItem(
    RECORD_STORAGE_KEY,
    JSON.stringify([...records, record]),
  );
}

// 이 게임의 기록만 삭제
export function clearRecords() {
  localStorage.removeItem(RECORD_STORAGE_KEY);
}
