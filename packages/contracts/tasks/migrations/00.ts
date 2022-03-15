/**
 * @name tasks/migrations/00.ts
 * @description Deploys the TitleV1_0 contract.
 */
import { task } from "hardhat/config";
import fs from "fs";
import { PROXY_INSTANCE_ADDRESS_FILEPATH } from "../../constants";

export default task("migration:00", "Initial deployment").setAction(
  async (args, hre, runSuper) => {
    console.log("Migration:00");
    console.log("Deploying contract");

    const network = hre.network.name;
    let proxyRegistryAddress: string;

    if (network === "rinkeby") {
      proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    } else if (network === "mainnet") {
      proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    } else {
      proxyRegistryAddress = "";
    }

    const Factory = await hre.ethers.getContractFactory("TitleV1_0");
    const instance = await hre.upgrades.deployProxy(Factory, [
      proxyRegistryAddress,
    ]);
    await instance.deployed();

    console.log(`Deployed with proxy to ${instance.address}`);

    if (args.ci) {
      // Write the proxy address to a config file
      fs.writeFileSync(PROXY_INSTANCE_ADDRESS_FILEPATH, instance.address);
    }

    console.log("Migration complete");
  }
);
