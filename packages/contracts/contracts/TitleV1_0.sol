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
    __ERC721_init("TaterNFT", "TATR");
    __Ownable_init();

    proxyRegistryAddress = proxyRegistryAddress_;
  }

  //////////////////////////////
  /// OpenSea
  //////////////////////////////

  /// @dev Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
  /// See: https://github.com/ProjectOpenSea/opensea-creatures/blob/a0db5ede13ffb2d43b3ebfc2c50f99968f0d1bbb/contracts/TradeableERC721Token.sol#L66
  function isApprovedForAll(address owner_, address operator_)
    public
    view
    override
    returns (bool)
  {
    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    if (address(proxyRegistry.proxies(owner_)) == operator_) {
      return true;
    }

    return super.isApprovedForAll(owner_, operator_);
  }
}
