import faker from "@faker-js/faker";
import { makeContract, lookupContractAddress } from "../../src/contract";
import { HARDHAT_NETWORK_ACCOUNTS as accounts } from "../../src/constants";

// Load contract address
const contractAddress = lookupContractAddress("localhost");

// Seeding to local blockchain
const contract = makeContract("http://localhost:8545", contractAddress);

async function mint(index: number): Promise<string> {
  const name = faker.address.streetAddress();
  const description = faker.commerce.productDescription();
  const externalUrl = faker.internet.url();
  const image = faker.image.city();
  const attrLandClassification = faker.commerce.department();
  const attrLocation = faker.address.streetAddress(true);
  const attrDeed = faker.internet.url();
  const attrParcels = faker.random.numeric();
  const attrOwner = faker.name.findName();
  const attrKML = faker.internet.url();
  const attrTag = `${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}`;

  const res = await contract.methods
    .mint(
      name,
      description,
      externalUrl,
      image,
      attrLandClassification,
      attrLocation,
      attrDeed,
      attrParcels,
      attrOwner,
      attrKML,
      attrTag
    )
    .send({
      from: accounts[index]
    });
  return res.transactionHash;
}

(async () => {
  console.log(`Seeding contract at ${contractAddress}`);

  // Health-check contract
  const name = await contract.methods.name().call({ from: accounts[0] });
  if (name !== "TaterNFT") throw new Error("Name validation failed");

  try {
    const hashes = await Promise.all(
      // Create one per account
      new Array(accounts.length).fill(null).map((_, index) => mint(index))
    );
    console.log(hashes);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
