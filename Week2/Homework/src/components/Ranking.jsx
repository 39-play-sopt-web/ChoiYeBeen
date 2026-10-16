import { useState } from "react";
import styled from "@emotion/styled";
import { getRecords, clearRecords } from "../utils/recordStorage";

function Ranking() {
  const [records, setRecords] = useState(() => getRecords());

  // 원본을 변경하지 않도록 복사한 뒤 플레이 시간 순으로 정렬
  const sortedRecords = [...records].sort((a, b) => a.playTime - b.playTime);

  function handleClearRecords() {
    clearRecords();
    setRecords([]);
  }

  return (
    <RankingContainer>
      <RankingHeader>
        <h2>🏆 랭킹</h2>
        <ResetButton type="button" onClick={handleClearRecords}>
          초기화
        </ResetButton>
      </RankingHeader>

      {records.length === 0 ? (
        <EmptyMessage>아직 기록이 없어요. 게임을 플레이해 보세요!</EmptyMessage>
      ) : (
        <RankingTable>
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">레벨</th>
              <th scope="col">플레이 시간</th>
              <th scope="col">기록 시간</th>
            </tr>
          </thead>

          <tbody>
            {sortedRecords.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Level {record.level}</td>
                <td>{(record.playTime / 1000).toFixed(2)}초</td>
                <td>{new Date(record.recordedAt).toLocaleString("ko-KR")}</td>
              </tr>
            ))}
          </tbody>
        </RankingTable>
      )}
    </RankingContainer>
  );
}

export default Ranking;

const RankingContainer = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const RankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const ResetButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.subText};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

const EmptyMessage = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.color.surface};

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.color.primary};
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
`;
