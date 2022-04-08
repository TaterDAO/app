import styled from "styled-components";
import Button from "./Button";

export default styled(Button)`
  background-color: var(--color-bright-green);
  color: var(--global-color-bg);

  &:hover {
    transition: all ease-in-out 0.1s;
    background-color: var(--color-bright-teal);
    opacity: 1;
  }
`;
