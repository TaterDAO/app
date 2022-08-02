import { escapeQuotes } from "./string";
import type { RawMetadata } from "../types/contract";

/**
 * Decodes contract's ERC721 metadata.
 * @param raw Base64 Encoded Metadata
 * @returns JSON object
 */
function decodeMetadata(raw: string): RawMetadata | null {
  let text;
  try {
    const buff = Buffer.from(
      raw.replace("data:application/json;base64,", ""),
      "base64"
    );
    text = buff.toString("utf8");

    // Patch: ensure that any metadata created prior to 9e08781c3feea61d31d99469c1bdc634a36ec571
    // does not break due to the presence of double quotes when being parsed into JSON.
    return JSON.parse(escapeQuotes(text));
  } catch (error) {
    console.log("\nError Decoding Metadata:");
    console.log(text);
    console.log(error);
    return null;
  }
}

export { decodeMetadata };
