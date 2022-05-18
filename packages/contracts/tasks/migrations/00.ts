/**
 * @name tasks/migrations/00.ts
 * @description Deploys the TitleV1_0 contract.
 */
import { task } from "hardhat/config";
import fs from "fs";
import {
  PROXY_INSTANCE_ADDRESS_FILEPATH,
  ROOT_DATA_DIR_PATH,
} from "../../constants";

export default task("migration:00", "Initial deployment").setAction(
  async (args, hre, runSuper) => {
    console.log("Migration:00");
    console.log("Deploying contract");

    const network = hre.network.name;
    const chainId = hre.network.config.chainId;
    let proxyRegistryAddress: string;

    // TODO: Update before deploying: OpenSea isn't on Arbitrum yet
    if (network === "mainnet") {
      proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    } else {
      // OpenSea Rinkeby Proxy Address
      // This address doesn't matter when testing locally / in a remote Hardhat session.
      proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    }

    const Factory = await hre.ethers.getContractFactory("TitleV1_0");
    const instance = await hre.upgrades.deployProxy(Factory, [
      proxyRegistryAddress,
    ]);
    await instance.deployed();

    console.log(`Deployed with proxy to ${instance.address}`);

    if (args.write) {
      // Write the proxy address to a config file
      // This is maintained for backwards-compatibility
      // TODO: Only use below write strategy.
      fs.writeFileSync(PROXY_INSTANCE_ADDRESS_FILEPATH, instance.address);

      // Write
      fs.writeFileSync(
        `${ROOT_DATA_DIR_PATH}/${chainId}.chain`,
        instance.address
      );
    }

    console.log("Migration complete");
  }
);
