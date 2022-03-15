/**
 * @name tasks/migrations/00.ts
 * @description Deploys the TitleV0_1 contract.
 */
import { task } from "hardhat/config";
import fs from "fs";
import { PROXY_INSTANCE_ADDRESS_FILEPATH } from "../../constants";

export default task("migration:00", "Initial deployment").setAction(
  async (args, hre, runSuper) => {
    console.log("Migration:00");
    console.log("Deploying contract");

    const Factory = await hre.ethers.getContractFactory("TitleV0_1");
    const instance = await hre.upgrades.deployProxy(Factory);
    await instance.deployed();

    console.log(`Deployed with proxy to ${instance.address}`);

    if (args.ci) {
      // Write the proxy address to a config file
      fs.writeFileSync(PROXY_INSTANCE_ADDRESS_FILEPATH, instance.address);
    }

    console.log("Migration complete");
  }
);
