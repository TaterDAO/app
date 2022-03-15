import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

import EVM from "./utils/EVM";

//$ State

let provider: Web3Provider;
let signers: Array<SignerWithAddress>;
let evm: EVM;

let factory: ContractFactory;
let contract: Contract;

let owner: Contract;
let ownerAddress: string;
let alice: Contract;
let aliceAddress: string;

//$ Helpers

//$ Tests

describe("HelloWorld.sol", async () => {
  before(async function () {
    //@ts-ignore
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    evm = new EVM(provider);
    signers = await ethers.getSigners();

    // Deploy contract
    factory = await ethers.getContractFactory("HelloWorld");
    contract = await upgrades.deployProxy(factory, []);
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
  });

  it("upgrades", async () => {
    const upgraded = await upgrades.upgradeProxy(contract.address, factory);
    expect(upgraded.address).to.equal(contract.address);
  });

  describe("#hello", async () => {
    it("Returns message", async () => {
      expect(await owner.hello()).to.equal("Hello World");
    });
  });

  describe("#setMessage", async () => {
    it("Updates message", async () => {
      const msg = "Goodbye World";
      await owner.setMessage(msg);
      expect(await owner.hello()).to.equal(msg);
    });
  });
});
