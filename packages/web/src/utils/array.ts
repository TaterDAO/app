export function chunk(arr: Array<any>, size: number): Array<Array<any>> {
  let i: number;
  let j: number;
  const chunks = [];
  for (i = 0, j = arr.length; i < j; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
