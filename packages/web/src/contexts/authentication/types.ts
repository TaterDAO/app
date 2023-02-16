export type AuthenticateMethodConfig = Partial<{
  // Success callback
  onSuccess: () => Promise<void>;
}>;

export interface ContextMethods {
  authenticate: (config?: AuthenticateMethodConfig) => Promise<void>;
}

export interface ContextState {
  authenticated: boolean;
  signature: string | null;
}

export type AuthToken = string | null;
