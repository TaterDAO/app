import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-accent-gray: #e2e2e2;

    --color-brand-pink: #F2275D;
    --color-brand-green: #41A650;
    --color-brand-mustard: #D99B29;
    --color-brand-gold: #A67924;
    --color-brand-black: #0D0D0D;

    --color-brand-blue-a: #040959;
    --color-brand-blue-b: #050840;
    --color-brand-blue-c: #072BF2;
    --color-brand-blue-d: #0726D9;
    --color-brand-blue-e: #051DA6;

    


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

  nav, main, footer {
    max-width: 1200px;
    margin: auto;
    padding: 1rem 2rem;
  }

  main {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;
