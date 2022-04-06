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

    --color-gray: #bbb;

    --color-bright-pink: #ef5777;
    --color-pink: #f28080;
    --color-bright-red: #df002d;
    --color-red: #dc143c;
    --color-light-red: #ec5b55;
    --color-dark-orange: #ab4033;
    --color-orange: #fe5d26;
    --color-bright-yellow: #ffa801;
    --color-yellow: #ffdd59;
    --color-pale-yellow: #fff5b0;
    --color-dark-green: #388174;
    --color-bright-green: #05c46b;
    --color-green: #3fd690;
    --color-pale-green: #d5fff3;
    --color-bright-teal: #06e4e4;
    --color-light-teal: #93dfd1;
    --color-teal: #49c5b6;
    --color-pale-teal: #c7f9ff;
    --color-bright-blue: #0fbcf9;
    --color-pastel-blue: #ebf2fb;
    --color-soft-blue: #add9f4;
    --color-pale-blue: #79abda;
    --color-dark-blue: #3983dd;
    --color-blue: #1e90ff;
    --color-pale-lavender: #96f;
    --color-lavender: #7a55e6;
    --color-indigo: #5352ed;
    --color-bright-indigo: #3742fa;
    --color-dark-indigo: #333f90;
    --color-black-blue: #002c59;
    --color-cyan: #49c5b6;
    --color-blue-magenta: #495de5;
    --color-tangaroa: #172534;
    --color-charcoal: #141414;
    --color-mostly-black: #222;
    --color-graphite: #3f3f37;
    --color-smoke: #525252;
    --color-fossil: #636e72;
    --color-mud: #878787;
    --color-granite: #909090;
    --color-silver: #bfc0c0;
    --color-cloud: #d2dae2;
    --color-blanc: #e1e1e1;
    --color-iron: #e8e8e8;
    --color-athens: #f7f9fc;
    --color-sand: #fbf9f9;
    --color-ghost: #fafcfe;
    --color-facebook: #3b5998;
    --color-google: #4285f4;
    --color-twitter: #56acee;
    --color-linkedin: #088ec4;

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
    text-decoration: none;
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
