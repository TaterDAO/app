export async function asyncForEach(
  array: Array<any>,
  func: (item: any) => Promise<void>
): Promise<void> {
  await array.reduce(async (memo, item) => {
    await memo;
    await func(item);
  }, Promise.resolve());
}