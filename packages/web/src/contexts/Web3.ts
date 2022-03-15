import { createContext } from "react";
import type { State } from "@T/Web3";

const defaultState = {};

const Web3Context = createContext(defaultState as State);
Web3Context.displayName = "Web3Context";

export default Web3Context;
