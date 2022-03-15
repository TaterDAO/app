/**
 * Checks whether the current runtime is client side rendered
 * @returns {boolean}
 */
function csr(): boolean {
  return typeof window !== "undefined";
}

export { csr };
