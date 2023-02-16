import AuthContext, { defaultState } from "./context";
import type {
  ContextState,
  ContextMethods,
  AuthToken,
  AuthenticateMethodConfig
} from "./types";

// Hooks
import { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

// Utils
import { csr } from "@utils/browser";
import { getMessageToSignV1 } from "./utils";

// Libs
import axios from "axios";
import { toast } from "react-toastify";

/**
 * The Authentication Provider enables wallets to "login" and make verified requests to the API,
 * for example burning a token that they own.
 *
 * We use an account-linked token, generated once for each account, and the wallet's signature of a message
 * that including this token, to verify that a given request originated from the wallet.
 *
 * The authentication flow occurs in several steps:
 *
 * 1. On wallet connection, check the cache for a token. If token is present, wallet is considered to be
 *    authenticated.
 *
 * 2 If no token is found within the cache, wait until user requests authentication via call to
 *   ContextMethods#authenticate.
 *
 * 3. ContextMethods#authenticate will make an API request to get the account-linked token. If this token has
 *    not already been generated, generation will occur and the token will be saved to Firebase. Otherwise, the
 *    previously generated token is returned to the client.
 *
 * 4. After the token is returned, the user is prompted to sign a message that includes the token using their
 *    wallet.
 *
 * 5. If user does not complete the signature, or another error occurs, the authentication flow is reset and
 *    will be restarted, as requested, on Step 2.
 *
 * 6. If user successfully signs, the signature is added to the provider state and saved to local storage
 *    (for de-caching during the next session by Step 1). If, in the process of calling Step 2, a "on success"
 *    callback was provided, this callback is triggered, resuming the expected UX flow (ideally with no
 *    perceptible UX difference from the user resuming authentication via a "successful" Step 1 cache-hit).
 *
 */
const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  //
  //
  // STATE
  //
  //

  const [signature, setSignature] = useState<string | null>(
    defaultState.signature
  );
  const [requestSignature, setRequestSignature] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<AuthToken>(null);
  const [onSuccessCallback, setOnSuccessCallback] =
    useState<CallableFunction | null>(null);

  //
  //
  // HOOKS
  //
  //

  const { address, isDisconnected } = useAccount();

  const authAPI = axios.create({
    baseURL: csr() ? `${window.location.origin}/api/auth/${address}/` : ""
  });

  const localStorageKey = `TATERDAO_AUTH_SIG_${address}`;

  const { signMessage } = useSignMessage({
    message: getMessageToSignV1(authToken),
    onMutate(args) {
      toast.info(
        "To proceed, you must authenticate your account. Please open your wallet.",
        {
          autoClose: false
        }
      );
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
    onSuccess: async function (data, variables, context) {
      console.log(`Signature Success!`);
      // Write to state
      setSignature(data);
      // Write to local storage
      window.localStorage.setItem(localStorageKey, data);
      // Callbacks
      if (onSuccessCallback) await onSuccessCallback();
    },
    // Reset state
    onSettled(data, error, variables, context) {
      setRequestSignature(false);
      setOnSuccessCallback(null);
    }
  });

  //
  //
  // EFFECTS
  //
  //

  /**
   * After wallet is connected, attempt to load signature from local storage.
   */
  const isClient = csr();
  useEffect(() => {
    if (isClient && !isDisconnected) {
      const cachedSig = window.localStorage.getItem(localStorageKey);
      if (cachedSig) {
        setSignature(cachedSig);
        console.log(`Auth signature for ${address} recovered from cache`);
      }
    }
  }, [isClient, address, isDisconnected]);

  /**
   * After `authToken` is loaded, attempt to sign it.
   */
  useEffect(() => {
    if (requestSignature && authToken) {
      signMessage();
    }
  }, [requestSignature, authToken]);

  //
  //
  // EVENT HANDLERS
  //
  //

  const requestToken = async (config: AuthenticateMethodConfig = {}) => {
    // Token cannot be requested until user connects their wallet. Prompt the
    // user to do so.
    if (isDisconnected) {
      toast.error("Please connect your wallet");
      return;
    }

    // Register callbacks
    if (config.onSuccess) {
      setOnSuccessCallback((prev) => {
        return config.onSuccess;
      });
    }

    // Request token and signature
    const { data } = await authAPI.get("token");
    setAuthToken(data.token);
    setRequestSignature(true);
  };

  //
  //
  // RENDER
  //
  //

  return (
    <AuthContext.Provider
      value={
        {
          // State:
          authenticated: !!signature,
          signature,
          // Methods:
          authenticate: requestToken
        } as ContextState & ContextMethods
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
