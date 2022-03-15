// Source Code
import { ContractIds } from "../../src/constants/Contracts";
import ContractAPI from "../../src/libs/ContractAPI";

// Libs
import Web3 from "web3";
import { expect } from "chai";
import fs from "fs";

// Types
import type { HttpProvider } from "web3-core";

// Test Helpers
import { PROXY_INSTANCE_ADDRESS_FILEPATH } from "./constants";
import { EVM } from "./utils";

let api: ContractAPI;
let evm: EVM;

describe("ContractAPI", async () => {
  before(async () => {
    const web3 = new Web3("http://127.0.0.1:8545/");

    // Create blank-slate snapshot
    evm = new EVM(web3.eth.currentProvider as HttpProvider);
    await evm.snapshot();

    const instanceAddress = fs
      .readFileSync(PROXY_INSTANCE_ADDRESS_FILEPATH)
      .toString();

    console.log(`Instance Address Loaded: ${instanceAddress}`);

    api = new ContractAPI(
      web3,
      ContractIds.HelloWorld,
      instanceAddress,
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" // Hardhat Chain Account #0
    );
  });

  // Reset contract state
  beforeEach(async () => {
    await evm.revert();
    await evm.snapshot();
  });

  describe("#hello", async () => {
    it("should be exposed", () => {
      expect(api.methods).to.haveOwnProperty("hello");
    });

    it("has the expected signature", async () => {
      const { args, returns } = api.getMethodSignature("hello");
      expect(args).to.have.lengthOf(0);
      expect(returns).to.have.lengthOf(1);
      expect(returns[0].name).to.be.empty.string;
      expect(returns[0].type).to.equal("string");
    });

    it("should be callable", async () => {
      const res = await api.methods.hello();
      expect(res).to.equal("Hello World");
    });

    it("accepts no args", async () => {
      try {
        await api.methods.hello(0);
        expect.fail();
      } catch (error) {
        //@ts-ignore
        expect(error.toString()).to.equal(
          "Error: #hello was called with 1 args; expects 0."
        );
      }
    });
  });

  describe("#setMessage", async () => {
    it("should be exposed", () => {
      expect(api.methods).to.haveOwnProperty("setMessage");
    });

    it("has the expected signature", async () => {
      const { args, returns } = api.getMethodSignature("setMessage");
      expect(returns).to.have.lengthOf(0);
      expect(args).to.have.lengthOf(1);
      expect(args[0].name).to.equal("newMessage_");
      expect(args[0].type).to.equal("string");
    });

    it("is callable", async () => {
      const msg = "Goodbye World";
      await api.methods.setMessage(msg);
      const res = await api.methods.hello();
      expect(res).to.equal(msg);
    });

    it("fails if incorrect args are passed", async () => {
      try {
        await api.methods.setMessage();
        expect.fail();
      } catch (error) {
        //@ts-ignore
        expect(error.toString()).to.equal(
          "Error: #setMessage was called with 0 args; expects 1."
        );
      }

      try {
        await api.methods.setMessage(0);
        expect.fail();
      } catch (error) {
        //@ts-ignore
        expect(error.toString()).to.equal(
          "Error: #setMessage arg (newMessage_: string) was passed number."
        );
      }
    });
  });
});
