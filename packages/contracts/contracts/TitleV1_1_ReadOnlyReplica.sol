// contracts/TitleV1_1_ReadOnlyReplica.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {TitleV1_1} from "./TitleV1_1.sol";
import {ReadOnlyReplica} from "../composer/packages/contracts/src/ReadOnlyReplica.sol";

contract TitleV1_1_ReadOnlyReplica is TitleV1_1, ReadOnlyReplica {}