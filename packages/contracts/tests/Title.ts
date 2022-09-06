import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

import EVM from "./utils/EVM";
import { decodeMetadata } from "./utils/Decode";
import { now } from "./utils/Time";

// =====================
// ===== Constants =====
// =====================

const OPENSEA_PROXY_ADDRESS = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";

const TEST_TOKEN = {
  name: "Sioux County farm",
  description: "Sioux farm with great productivity.",
  external_url:
    "test-spring-banner-839.appspot.com/project/public/ahZ0ZXN0LXNwcmluZy1iYW5uZXItODM5ch0LEhBQcm9qZWN0UHVibGljVXJsGICAgIH_zYcJDA",
  image: "ipfs://QmdvS6ZpxGysgcXPS24tqAZX9c1f2VuQ3ZgFeeQSvQFCHo",
  attributes: [
    {
      trait_type: "Land Classification",
      value: "Irrigated Cropland",
      display_type: "string",
    },
    {
      trait_type: "Location",
      value: "3 Miles NW of Boyden",
      display_type: "string",
    },
    { trait_type: "Legal/Deed", value: "", display_type: "string" },
    {
      trait_type: "Parcels",
      value: "High Caliber Farm",
      display_type: "string",
    },
    { trait_type: "Owner", value: "Unknown", display_type: "string" },
    {
      trait_type: "KML Download",
      value: "ipfs://QmPRgCAdRsTY6zL2j7PmvtoNf79Nx3xdhPA4vJdJQtJVjC",
      display_type: "string",
    },
    { trait_type: "Tag", value: "Farm Sale, Iowa", display_type: "string" },
    { display_type: "date", trait_type: "Created At", value: 1644339784 },
    { trait_type: "Max Supply", value: "1", display_type: "number" },
  ],
};

const tokenData = [
  TEST_TOKEN.name,
  TEST_TOKEN.description,
  TEST_TOKEN.external_url,
  TEST_TOKEN.image,
  TEST_TOKEN.attributes[0].value,
  TEST_TOKEN.attributes[1].value,
  TEST_TOKEN.attributes[2].value,
  TEST_TOKEN.attributes[3].value,
  TEST_TOKEN.attributes[4].value,
  TEST_TOKEN.attributes[5].value,
  TEST_TOKEN.attributes[6].value,
];

// =================
// ===== State =====
// =================

let provider: Web3Provider;
let signers: Array<SignerWithAddress>;
let evm: EVM;

let factory: ContractFactory;
let upgrade_factory: ContractFactory;
let contract: Contract;

let owner: Contract;
let ownerAddress: string;
let alice: Contract;
let aliceAddress: string;

// ===================
// ===== Helpers =====
// ===================

// =================
// ===== Tests =====
// =================

describe("TitleV1_0.sol", async () => {
  before(async function () {
    //@ts-ignore
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    evm = new EVM(provider);
    signers = await ethers.getSigners();

    // Deploy contract
    factory = await ethers.getContractFactory("TitleV1_0");
    upgrade_factory = await ethers.getContractFactory("TitleV1_1");
    contract = await upgrades.deployProxy(factory, [OPENSEA_PROXY_ADDRESS]);
    await contract.deployed();

    owner = contract.connect(signers[0]);
    alice = contract.connect(signers[1]);

    ownerAddress = signers[0].address;
    aliceAddress = signers[1].address;

    await evm.snapshot();
  });

  // Reset contract state
  beforeEach(async function () {
    await evm.revert();
    await evm.snapshot();
  });

  it("deploys", async () => {
    expect(contract.address).to.not.be.null;
    expect(await contract.name()).to.equal("TaterNFT");
    expect(await contract.symbol()).to.equal("TATR");
    expect(await contract.owner()).to.equal(ownerAddress);
  });

  it("upgrades", async () => {
    const upgraded = await upgrades.upgradeProxy(
      contract.address,
      upgrade_factory
    );
    expect(upgraded.address).to.equal(contract.address);
  });

  it("can be transferred", async () => {
    await owner.transferOwnership(aliceAddress);
    expect(await contract.owner()).to.equal(aliceAddress);
  });

  context("Minting", async () => {
    it("Mints", async () => {
      await owner.mint(...tokenData);
      await alice.mint(...tokenData);
      expect(await contract.ownerOf(0)).to.equal(ownerAddress);
      expect(await contract.ownerOf(1)).to.equal(aliceAddress);
    });
  });

  context("Burning", async () => {
    it("Burns", async () => {
      await alice.mint(...tokenData);
      await alice.burn(0);
      await expect(contract.ownerOf(0)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });
  });

  context("Metadata (#tokenURI)", async () => {
    let data: any;

    const nextBlockTimestamp = (await now()).add(360);

    before(async () => {
      await provider.send("evm_setNextBlockTimestamp", [nextBlockTimestamp]);

      await contract.mint(
        TEST_TOKEN.name,
        TEST_TOKEN.description,
        TEST_TOKEN.external_url,
        TEST_TOKEN.image,
        TEST_TOKEN.attributes[0].value,
        TEST_TOKEN.attributes[1].value,
        TEST_TOKEN.attributes[2].value,
        TEST_TOKEN.attributes[3].value,
        TEST_TOKEN.attributes[4].value,
        TEST_TOKEN.attributes[5].value,
        TEST_TOKEN.attributes[6].value
      );

      const raw = await contract.tokenURI(0);
      data = decodeMetadata(raw);
    });

    it("Token ID", () => {
      expect(data.tokenId).to.equal("0");
    });

    it("Name", () => {
      expect(data.name).to.equal(TEST_TOKEN.name);
    });

    it("Description", () => {
      expect(data.description).to.equal(TEST_TOKEN.description);
    });

    it("External URL", () => {
      expect(data.external_url).to.equal(TEST_TOKEN.external_url);
    });

    it("Image", () => {
      expect(data.image).to.equal(TEST_TOKEN.image);
    });

    it("Attr: Land Classification", () => {
      const { trait_type, value, display_type } = data.attributes[0];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[0].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[0].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[0].display_type);
    });

    it("Attr: Location", () => {
      const { trait_type, value, display_type } = data.attributes[1];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[1].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[1].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[1].display_type);
    });

    it("Attr: Legal/Deed", () => {
      const { trait_type, value, display_type } = data.attributes[2];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[2].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[2].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[2].display_type);
    });

    it("Attr: Parcels", () => {
      const { trait_type, value, display_type } = data.attributes[3];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[3].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[3].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[3].display_type);
    });

    it("Attr: Owner", () => {
      const { trait_type, value, display_type } = data.attributes[4];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[4].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[4].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[4].display_type);
    });

    it("Attr: KML Download", () => {
      const { trait_type, value, display_type } = data.attributes[5];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[5].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[5].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[5].display_type);
    });

    it("Attr: Tag", () => {
      const { trait_type, value, display_type } = data.attributes[6];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[6].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[6].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[6].display_type);
    });

    it("Attr: Created At", () => {
      const { trait_type, value, display_type } = data.attributes[7];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[7].trait_type);
      expect(value).to.equal(nextBlockTimestamp);
      expect(display_type).to.equal(TEST_TOKEN.attributes[7].display_type);
    });

    it("Attr: Max Supply", () => {
      const { trait_type, value, display_type } = data.attributes[8];
      expect(trait_type).to.equal(TEST_TOKEN.attributes[8].trait_type);
      expect(value).to.equal(TEST_TOKEN.attributes[8].value);
      expect(display_type).to.equal(TEST_TOKEN.attributes[8].display_type);
    });
  });
});
