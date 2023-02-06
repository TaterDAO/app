export const CONTRACT_ADDRESSES: Record<number, string> = {
  // Ethereum
  1: "",
  // Goerli
  5: "7e7A0c7289f0EaB319E4bE0FEa7772a08e13A751",
  // Arbitrum
  42161: "",
  // Arb Goerli
  421613: "",
  // Polygon
  137: "",
  // Polygon Mumbai
  80001: ""
};

export const MINT_ABI = {
  name: "mint",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    {
      internalType: "string",
      name: "metadataId_",
      type: "string"
    }
  ],
  outputs: []
};

export const BURN_ABI = {
  name: "burn",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId_",
      type: "uint256"
    }
  ],
  outputs: []
};
