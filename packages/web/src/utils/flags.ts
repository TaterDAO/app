/**
 * Should mint and burn be disabled?
 * @returns boolean
 */
function transactionsDisabled(): boolean {
  //@ts-ignore
  return process.env.NEXT_PUBLIC_DISABLE_TRANSACTIONS;
}

export { transactionsDisabled };
