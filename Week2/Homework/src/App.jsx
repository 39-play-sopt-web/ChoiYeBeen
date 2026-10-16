import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import useNumberGame from "./hooks/useNumberGame";
import Ranking from "./components/Ranking";

function App() {
  const [menu, setMenu] = useState("game");

  const game = useNumberGame();

  return (
    <>
      <GlobalStyle />
      <Header
        menu={menu}
        onMenuChange={setMenu}
        elapsedTime={game.elapsedTime}
        level={game.level}
        onLevelChange={game.handleLevelChange}
      />
      <Main>
        {menu === "game" ? (
          <Game
            numbers={game.numbers}
            nextNumber={game.nextNumber}
            size={game.size}
            onNumberClick={game.handleNumberClick}
          />
        ) : (
          <Ranking />
        )}
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  flex: 1;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.backgroundStart},
    ${({ theme }) => theme.color.backgroundEnd}
  );
`;
