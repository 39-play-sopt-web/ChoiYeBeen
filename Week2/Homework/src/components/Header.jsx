import styled from "@emotion/styled";

function Header({ menu, onMenuChange, elapsedTime, level, onLevelChange }) {
  return (
    <HeaderContainer>
      <Title>🔢숫자 클릭 게임</Title>

      <Menu>
        <MenuButton
          type="button"
          aria-pressed={menu === "game"}
          onClick={() => onMenuChange("game")}
        >
          게임
        </MenuButton>
        <MenuButton
          type="button"
          aria-pressed={menu === "ranking"}
          onClick={() => onMenuChange("ranking")}
        >
          랭킹
        </MenuButton>
      </Menu>

      {menu === "game" && (
        <GameControls>
          <LevelSelect
            aria-label="게임 레벨"
            value={level}
            onChange={(event) => onLevelChange(Number(event.target.value))}
          >
            <option value="1">Level 1 (3x3)</option>
            <option value="2">Level 2 (4x4)</option>
            <option value="3">Level 3 (5x5)</option>
          </LevelSelect>

          <Timer>{(elapsedTime / 1000).toFixed(2)}초</Timer>
        </GameControls>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color.surface};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  justify-self: start;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const MenuButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  background-color: ${({ theme }) => theme.color.transparent};
  color: ${({ theme }) => theme.color.subText};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &[aria-pressed="true"] {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primaryText};
  }
`;

const GameControls = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 12px;
`;

const LevelSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.surface};
  font-size: 14px;
`;

const Timer = styled.span`
  padding: 6px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
  font-size: 14px;
  font-weight: 600;
`;
