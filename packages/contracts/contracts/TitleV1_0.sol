// contracts/TitleV1_0.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "./libs/Base64.sol";
import "./OpenSea/ProxyRegistry.sol";
import "./libs/Utils.sol";

/// @title TitleV1_0
/// @author 721 Labs (https://721.dev)
contract TitleV1_0 is
  ERC721Upgradeable,
  OwnableUpgradeable,
  ReentrancyGuardUpgradeable
{
  using StringsUpgradeable for uint256;
  using StringsUpgradeable for uint8;

  //////////////////////////////
  /// State
  //////////////////////////////

  address public proxyRegistryAddress;

  //////////////////////////////
  /// Constructor
  //////////////////////////////

  /// @param proxyRegistryAddress_ OpenSea Proxy Registry Address
  function initialize(address proxyRegistryAddress_) public initializer {
    __ERC721_init("Development", "DEV");
    __Ownable_init();

    proxyRegistryAddress = proxyRegistryAddress_;
  }
}
