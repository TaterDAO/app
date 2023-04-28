// Given an XML string, returns an XMLDocument.
export function stringToXMLDocument(val: string): XMLDocument {
  const parser = new DOMParser();
  return parser.parseFromString(val, "text/xml");
}
