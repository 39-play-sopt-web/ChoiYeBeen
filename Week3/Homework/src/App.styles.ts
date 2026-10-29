import styled from 'styled-components';

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button<{ $selected: boolean }>`
  padding: 8px 14px;
  border: 0;
  border-radius: 20px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background : theme.colors.text};
  cursor: pointer;
`;
