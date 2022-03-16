import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  :root {
    --color-accent-gray: #e2e2e2;

    font-size: 15px;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    text-rendering: geometricPrecision;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;

    font-family: 'Inter', sans-serif;
  }

  a {
    cursor: pointer;
  }
  
  button {
    cursor: pointer;
  }
`;
