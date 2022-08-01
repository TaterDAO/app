import type { RawMetadata } from "./types";
import Web3 from "web3";
import { readFileSync } from "node:fs";
import { escapeQuotes } from "./utils";

// TODO: ABI should be available within its own package
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id_",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string"
      },
      {
        internalType: "string",
        name: "description_",
        type: "string"
      },
      {
        internalType: "string",
        name: "externalUrl_",
        type: "string"
      },
      {
        internalType: "string",
        name: "image_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrLandClassification_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrLocation_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrDeed_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrParcels_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrOwner_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrKml_",
        type: "string"
      },
      {
        internalType: "string",
        name: "attrTag_",
        type: "string"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

/**
 * Decodes contract's ERC721 metadata.
 * @param raw Base64 Encoded Metadata
 * @returns JSON object
 */
function decodeMetadata(raw: string): RawMetadata | null {
  let text;
  try {
    const buff = Buffer.from(
      raw.replace("data:application/json;base64,", ""),
      "base64"
    );
    text = buff.toString("utf8");

    // Patch: ensure that any metadata created prior to 9e08781c3feea61d31d99469c1bdc634a36ec571
    // does not break due to the presence of double quotes when being parsed into JSON.
    // @ts-ignore
    return JSON.parse(String.raw(text));
  } catch (error) {
    console.log("\nError Decoding Metadata:");
    console.log(text);
    console.log(error);
    return null;
  }
}

/**
 * Instantiates new Web3.eth.contract contract instance.
 * @param rpcEndpoint Network RPC endpoint
 * @param contractAddress Address on the given network
 * @returns contract
 */
function makeContract(rpcEndpoint: string, contractAddress: string) {
  const web3 = new Web3(rpcEndpoint);
  return new web3.eth.Contract(
    //@ts-ignore
    abi,
    contractAddress
  );
}

/**
 * Looks up the contract address for a given network
 * @param networkName Name of blockchain
 * @returns Address
 */
function lookupContractAddress(networkName: string): string {
  const raw = readFileSync(
    `${__dirname}/../../../../data/${networkName}.chain`
  );
  return raw.toString("utf-8");
}

export { decodeMetadata, makeContract, lookupContractAddress };
