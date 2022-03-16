import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  :root {
    --color-accent-gray: #e2e2e2;

    --color-brand-pink: #F2275D;
    --color-brand-green: #41A650;
    --color-brand-mustard: #D99B29;
    --color-brand-gold: #A67924;
    --color-brand-black: #0D0D0D;


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

    color: var(--color-brand-black);
    background-color: white;
  }

  a {
    cursor: pointer;
  }
  
  button {
    cursor: pointer;
  }
`;
