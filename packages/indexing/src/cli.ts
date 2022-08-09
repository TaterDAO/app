import { NETWORKS } from "./constants";

function validateNetworkArg(value: string): string {
  if (!value) {
    throw new Error("Position 0 arg `network` is required");
  }
  if (!NETWORKS.includes(value)) {
    throw new Error(`Network [${value}] is unsupported`);
  }

  return value;
}

export { validateNetworkArg };
