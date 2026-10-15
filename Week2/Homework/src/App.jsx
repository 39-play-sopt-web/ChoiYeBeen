import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  const [menu, setMenu] = useState("game");

  return (
    <>
      <GlobalStyle />
      <Header menu={menu} onMenuChange={setMenu} />
      <Main>{menu === "game" ? <Game /> : <p>랭킹 화면</p>}</Main>
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
