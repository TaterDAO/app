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

type TypedArgs = Array<string | number | boolean>;

/**
 * Given a method signature and array of args, casts the args into their expected types.
 * @param signature Method signature
 * @param args Array of args as strings
 * @returns Array of args cast into their expected types.
 */
function typeCastSignatureArgs(
  signature: string,
  args: Array<string>
): TypedArgs {
  const typedArgs: TypedArgs = [];
  const argTypes = signature.split("(")[1].replace(")", "").split(",");
  argTypes.forEach((type, index) => {
    if (type.includes("string")) typedArgs[index] = args[index];
    else if (type.includes("uint")) typedArgs[index] = parseInt(args[index]);
    else if (type.includes("bool")) typedArgs[index] = args[index] == "true";
  });
  return typedArgs;
}

export { decodeMetadata, typeCastSignatureArgs };
