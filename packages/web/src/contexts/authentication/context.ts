import { Context } from "mocha";
import { createContext } from "react";
import type { ContextState, ContextMethods } from "./types";

export const defaultState = {
  authenticated: false,
  signature: null
} as ContextState;

const methodPlaceholders = {
  authenticate: async () => {}
} as ContextMethods;

const AuthContext = createContext({ ...defaultState, ...methodPlaceholders });

export default AuthContext;
