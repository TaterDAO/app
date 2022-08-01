function replaceAt(value: string, index: number, replacement: string): string {
  return (
    value.substring(0, index) +
    replacement +
    value.substring(index + replacement.length)
  );
}

/**
 * Replaces quotes with their HTML entity representations.
 * @see https://www.htmlhelp.com/reference/html40/entities/special.html
 * @param value String value to escape
 * @returns Escaped string
 */
function escapeQuotes(value: string): string {
  try {
    JSON.parse(value);
    return value;
  } catch (error) {
    const msg = (error as SyntaxError).message;
    let tokenType = msg.match(/token (?<char>\w{1})/);

    let position = msg.match(/position (?<n>\d{1,4})/);
    //@ts-ignore
    const errorIndex = parseInt(position?.groups.n) - 1;

    //@ts-ignore
    switch (tokenType?.groups.char) {
      case "I": {
        // Invoke recursively to handle any other issues
        return escapeQuotes(replaceAt(value, errorIndex, "&quot;"));
      }
      default: {
        throw error;
      }
    }
  }
}

export { escapeQuotes };
