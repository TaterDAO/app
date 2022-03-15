/**
 * Decode Base64 encoded metadata
 * @param raw base64 string
 * @returns metadata object
 */
function decodeMetadata(raw: string): {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  external_url: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
} {
  const buff = Buffer.from(
    raw.replace("data:application/json;base64,", ""),
    "base64"
  );
  const text = buff.toString("utf8");
  return JSON.parse(text);
}

export { decodeMetadata };
