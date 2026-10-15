import { Global, css } from "@emotion/react";

const globalStyle = (theme) => css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    color: ${theme.color.text};
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button,
  select {
    font: inherit;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

export default GlobalStyle;
