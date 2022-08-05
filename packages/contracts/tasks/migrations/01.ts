/**
 * @name tasks/migrations/01.ts
 * @description Upgrades the TitleV1_0 contract to TitleV1_1.
 */
import { task } from "hardhat/config";
import fs from "fs";
import { PROXY_INSTANCE_ADDRESS_FILEPATH } from "../../constants";

interface Params {
  address: string | null;
  ci: boolean;
}

export default task("migration:01", "Upgrade")
  .addParam("address", "Proxy Instance address", null, undefined, true)
  .addParam(
    "ci",
    "Is this migration running as part of Continuous Integration smoke testing?",
    false
  )
  .setAction(async ({ address, ci }: Params, hre, runSuper) => {
    console.log("[Migration:01] Upgrading TitleV1_0 to TitleV1_1");
    let instanceAddress: string;
    if (ci) {
      // This implementation is only allowed during testing.
      if (hre.network.name !== "localhost") throw new Error("Testing only");
      // Read from the config file created in Migration:00
      instanceAddress = fs.readFileSync(
        PROXY_INSTANCE_ADDRESS_FILEPATH,
        "utf-8"
      );
    } else if (address) instanceAddress = address;
    else throw new Error("If not CI, address must be provided!");

    const Factory = await hre.ethers.getContractFactory("TitleV1_1");
    await hre.upgrades.upgradeProxy(instanceAddress, Factory);
    console.log("Migration complete");
  });
