/**
 * @name tasks/migrations/01.ts
 * @description Upgrades the TitleV1_0 contract.
 */
import { task } from "hardhat/config";
import fs from "fs";
import { PROXY_INSTANCE_ADDRESS_FILEPATH } from "../../constants";

export default task("migration:01", "Upgrade")
  .addParam("address", "Proxy Instance address")
  .setAction(async ({ address, ci }, hre, runSuper) => {
    throw new Error("Placeholder for migration upgrades");

    // console.log("Migration:01");
    // console.log("Upgrading contract");

    // let instanceAddress: string;

    // if (ci) {
    //   // This implementation is only allowed during testing.
    //   if (hre.network.name !== "localhost") throw new Error("Testing only");

    //   // Read from the config file created in Migration:00
    //   instanceAddress = fs.readFileSync(
    //     PROXY_INSTANCE_ADDRESS_FILEPATH,
    //     "utf-8"
    //   );
    // } else {
    //   instanceAddress = address;
    // }

    // const Factory = await hre.ethers.getContractFactory("TitleV1_0");
    // await hre.upgrades.upgradeProxy(instanceAddress, Factory);

    // console.log("Migration complete");
  });
