import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

import EVM from "./utils/EVM";

// =====================
// ===== Constants =====
// =====================

const OPENSEA_PROXY_ADDRESS = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";

// =================
// ===== State =====
// =================

let provider: Web3Provider;
let signers: Array<SignerWithAddress>;
let evm: EVM;

let factory: ContractFactory;
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
    expect(await contract.name()).to.equal("Development");
    expect(await contract.symbol()).to.equal("DEV");
    expect(await contract.owner()).to.equal(ownerAddress);
  });

  it("upgrades", async () => {
    const upgraded = await upgrades.upgradeProxy(contract.address, factory);
    expect(upgraded.address).to.equal(contract.address);
  });

  it("can be transferred", async () => {
    await owner.transferOwnership(aliceAddress);
    expect(await contract.owner()).to.equal(aliceAddress);
  });
});
