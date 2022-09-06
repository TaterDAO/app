// contracts/TitleV1_1.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./libs/Base64.sol";
import "./OpenSea/ProxyRegistry.sol";
import "./title/TitleBase.sol";

/// @title TitleV1_1
/// @author 721 Labs (https://721.dev)
contract TitleV1_1 is TitleBase {
    //////////////////////////////
    /// Libraries
    //////////////////////////////

    // Since ^0.7.0 libraries are not inherited.
    using StringsUpgradeable for uint256;
    using StringsUpgradeable for uint8;

    //////////////////////////////
    /// Constructor
    //////////////////////////////

    /// @param proxyRegistryAddress_ OpenSea Proxy Registry Address
    function initialize(address proxyRegistryAddress_) public initializer {
        __TitleBase_init();
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
