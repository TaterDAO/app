import type { AuthToken } from "./types";

/**
 * Returns message that a wallet must sign in order to authenticate.
 * This message is deterministic and should be used to verify that a given
 * request is authenticated (by recovering the token given the signature).
 * @param authToken Wallet specific auth token
 * @returns Message
 */
export function getMessageToSignV1(authToken: AuthToken) {
  return authToken
    ? `Welcome to TaterDAO.\n\nBy signing this message, you agree to abide by our Terms of Service (https://taterdao.com/info/terms).\n\nTaterDAO ID: ${authToken}\n\nAuth: v1.0`
    : "";
}
