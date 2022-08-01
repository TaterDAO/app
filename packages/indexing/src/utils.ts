/**
 * Replaces quotes with their HTML entity representations.
 * @see https://www.htmlhelp.com/reference/html40/entities/special.html
 * @param value String value to escape
 * @returns Escaped string
 */
function escapeQuotes(value: string): string {
  // Quotation Mark
  value = value.replaceAll(/\"/g, "&quot;");

  // Left single quotation mark
  value = value.replaceAll(/\‘/g, "&lsquo;");

  // Right single quotation mark
  value = value.replaceAll(/\’/g, "&rsquo;");

  // Left double quotation mark
  value = value.replaceAll(/\“/g, "&ldquo;");

  // Right double quotation mark
  value = value.replaceAll(/\”/g, "&rdquo;");

  return value;
}

export { escapeQuotes };
