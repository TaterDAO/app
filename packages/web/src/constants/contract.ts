export const CONTRACT_ADDRESSES: Record<number, string> = {
  // Ethereum
  1: "50ab244fe1477C65fDfDDF86d327D7Ea27902810",
  // Goerli
  5: "E43a71604B64f8Cd15072096B75a8449E3AcC4dd",
  // Arbitrum
  42161: "9B0b70eDaa3b6Ae70389d8514ED65AcD86386ef2",
  // Arb Goerli
  421613: "b72f6d74b929a95a440245c9154ab0cd31ee263b",
  // Polygon
  137: "f6a44012d24ca5d67ece21ea7d34886a55754e86"
  // Polygon Mumbai
  //80001: ""
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

export const TOKEN_ID_BY_METADATA_ABI = {
  name: "tokenIdByMetadataId",
  type: "function",
  stateMutability: "view",
  inputs: [
    {
      internalType: "string",
      name: "metadataId_",
      type: "string"
    }
  ],
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256"
    }
  ]
};

export const METADATA_ID_BY_TOKEN_ID_ABI = {
  name: "metadataIdByTokenId",
  type: "function",
  stateMutability: "view",
  inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
  outputs: [{ internalType: "string", name: "", type: "string" }]
};

export const OWNER_OF_ABI = {
  name: "ownerOf",
  type: "function",
  stateMutability: "view",
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256"
    }
  ],
  outputs: [
    {
      internalType: "address",
      name: "",
      type: "address"
    }
  ]
};

export const BALANCE_OF_ABI = {
  name: "balanceOf",
  type: "function",
  stateMutability: "view",
  inputs: [
    {
      internalType: "address",
      name: "owner",
      type: "address"
    }
  ],
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256"
    }
  ]
};

export const TOKEN_OF_OWNER_BY_INDEX_ABI = {
  name: "tokenOfOwnerByIndex",
  type: "function",
  stateMutability: "view",
  inputs: [
    { internalType: "address", name: "owner", type: "address" },
    { internalType: "uint256", name: "index", type: "uint256" }
  ],
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }]
};
