/**
 * @name tasks/migrations/02.ts
 * @description Deploys the TitleV1_1_ReadOnlyReplica contract.
 */
import { task } from "hardhat/config";
import fs from "fs";
import { ROOT_DATA_DIR_PATH } from "../../constants";

const contractId = "TitleV1_1_ReadOnlyReplica";

export default task("migration:02", `Deploy ${contractId}.sol`)
  .addParam("writer", "Address of writer")
  .setAction(async ({ writer }, hre, runSuper) => {
    console.log(`Migration:02: Deploying ${contractId}.sol`);

    const Factory = await hre.ethers.getContractFactory(contractId);
    const instance = await hre.upgrades.deployProxy(Factory, [writer]);
    await instance.deployed();

    console.log(`Deployed with proxy to ${instance.address}`);

    // Write
    fs.writeFileSync(
      `${ROOT_DATA_DIR_PATH}/${contractId}-${hre.network.name}.chain`,
      instance.address
    );

    console.log("Migration complete");
  });
