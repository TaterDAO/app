// Data
const addresses = require("../src/data/addresses.json");
const abi = require("../src/data/contracts/TitleV1_0.sol/TitleV1_0.json");

// Libs
const Web3 = require("web3");

function validateNetworkArg(value) {
  if (!value) {
    throw new Error("Position 0 arg `network` is required");
  }
  if (!Object.keys(addresses).includes(value)) {
    throw new Error(`Network [${value}] does not have a contract address`);
  }
}

function validateNetworkEndpointArg(value) {
  if (!value) {
    throw new Error("Position 1 arg `networkEndpoint` is required");
  }

  try {
    new URL(value);
  } catch (error) {
    throw new Error(`Network Endpoint [${value}] is not a valid url`);
  }
}

function decodeMetadata(raw) {
  const buff = Buffer.from(
    raw.replace("data:application/json;base64,", ""),
    "base64"
  );
  const text = buff.toString("utf8");
  return JSON.parse(text);
}

async function* Fetcher(network, networkEndpoint) {
  const web3 = new Web3(networkEndpoint);
  const contract = new web3.eth.Contract(abi, addresses[network]);

  async function fetch(tokenId) {
    const res = await contract.methods.tokenURI(tokenId).call({
      // Hardcoded for now...
      from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    });
    return decodeMetadata(res);
  }

  let tokenId = 0;

  while (true) {
    const data = await fetch(tokenId);
    tokenId++;
    yield data;
  }
}

/**
 * Main Routine.
 */
(async () => {
  const args = process.argv.slice(2);

  const network = args[0];
  validateNetworkArg(network);

  const networkEndpoint = args[1];
  validateNetworkEndpointArg(networkEndpoint);

  const fetcher = Fetcher(network, networkEndpoint);

  try {
    for await (const value of fetcher) {
      console.log(value);
    }
  } catch (error) {
    const msg = error.message;
    if (msg.includes("ERC721Metadata: URI query for nonexistent token")) {
      // noop
    } else {
      console.log(msg);
    }
  }

  // const dataMap = {};
  // let queryId = 1;

  // try {
  //   const data = await fetch(1);
  //   console.log(data);
  // } catch (error) {
  //   console.log(error.message);
  // }
})();
