import { Web3Provider } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { ContractFactory } from "ethers";

import EVM from "./utils/EVM";
import { expect } from "chai";

// =====================
// ===== Constants =====
// =====================

const WRITER_ROLE_SIGNATURE = keccak256(toUtf8Bytes("WRITER_ROLE"));

const DISABLED_METHOD_ERROR = "reverted with custom error 'DisabledMethod()'";

const MINT_METHOD_SIG =
  "mint(string,string,string,string,string,string,string,string,string,string,string,string,address)";

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
let bob: Contract;
let bobAddress: string;
let writer: Contract;
let writerAddress: string;

// ===================
// ===== Helpers =====
// ===================

function accessControlError(address: string): string {
  return `AccessControl: account ${address} is missing role ${WRITER_ROLE_SIGNATURE}`;
}

/**
 * Shortcut function to mint.
 * @param to Address to mint the Title to
 */
async function mint(to: string, sender: Contract = writer) {
  return await sender[MINT_METHOD_SIG](...new Array(12).fill(""), to);
}

describe("TitleV1_1_ReadOnlyReplica.sol", async () => {
  before(async () => {
    //@ts-ignore
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    evm = new EVM(provider);
    signers = await ethers.getSigners();
    writerAddress = signers[3].address;

    // Deploy contract
    factory = await ethers.getContractFactory("TitleV1_1_ReadOnlyReplica");
    contract = await upgrades.deployProxy(factory, [writerAddress]);
    await contract.deployed();

    owner = contract.connect(signers[0]);
    ownerAddress = signers[0].address.toLowerCase();
    alice = contract.connect(signers[1]);
    aliceAddress = signers[1].address.toLowerCase();
    bob = contract.connect(signers[2]);
    bobAddress = signers[2].address.toLowerCase();
    writer = contract.connect(signers[3]);

    await evm.snapshot();
  });

  // Reset contract state
  beforeEach(async () => {
    await evm.revert();
    await evm.snapshot();
  });

  context("Setup", async () => {
    it("Sets writer address", async () => {
      expect(await owner.hasRole(WRITER_ROLE_SIGNATURE, writerAddress)).to.be
        .true;
    });
  });

  context("Disabled Methods", async () => {
    it("approve", async () => {
      await expect(owner.approve(ownerAddress, 0)).to.be.revertedWith(
        DISABLED_METHOD_ERROR
      );
    });

    it("setApprovalForAll", async () => {
      await expect(
        owner.setApprovalForAll(ownerAddress, true)
      ).to.be.revertedWith(DISABLED_METHOD_ERROR);
    });
  });

  context("Read-only Methods", async () => {
    context("Accessible via Writer", async () => {
      it("burn", async () => {
        await mint(aliceAddress);
        await writer.burn(0);
      });

      it("mint", async () => {
        await mint(aliceAddress);
      });

      it("transferFrom", async () => {
        await mint(aliceAddress);
        await writer.transferFrom(aliceAddress, bobAddress, 0);
        expect((await owner.ownerOf(0)).toLowerCase()).to.equal(bobAddress);
      });

      it("safeTransferFrom(address,address,uint256)", async () => {
        await mint(aliceAddress);
        await writer["safeTransferFrom(address,address,uint256)"](
          aliceAddress,
          bobAddress,
          0
        );
        expect((await owner.ownerOf(0)).toLowerCase()).to.equal(bobAddress);
      });

      it("safeTransferFrom(address,address,uint256,bytes)", async () => {
        await mint(aliceAddress);
        await writer["safeTransferFrom(address,address,uint256,bytes)"](
          aliceAddress,
          bobAddress,
          0,
          toUtf8Bytes("")
        );
        expect((await owner.ownerOf(0)).toLowerCase()).to.equal(bobAddress);
      });
    });

    context("Restricted", async () => {
      it("burn", async () => {
        await expect(owner.burn(0)).to.be.revertedWith(
          accessControlError(ownerAddress)
        );
      });

      it("mint", async () => {
        await expect(mint(aliceAddress, owner)).to.be.revertedWith(
          accessControlError(ownerAddress)
        );
      });

      it("transferFrom", async () => {
        await expect(
          owner.transferFrom(ownerAddress, aliceAddress, 0)
        ).to.be.revertedWith(accessControlError(ownerAddress));
      });

      it("safeTransferFrom(address,address,uint256)", async () => {
        await expect(
          owner["safeTransferFrom(address,address,uint256)"](
            ownerAddress,
            aliceAddress,
            0
          )
        ).to.be.revertedWith(accessControlError(ownerAddress));
      });

      it("safeTransferFrom(address,address,uint256,bytes)", async () => {
        await expect(
          owner["safeTransferFrom(address,address,uint256,bytes)"](
            ownerAddress,
            aliceAddress,
            0,
            toUtf8Bytes("")
          )
        ).to.be.revertedWith(accessControlError(ownerAddress));
      });
    });
  });
});
