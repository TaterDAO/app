// contracts/TitleV1_1_ReadOnlyReplica.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./title/TitleBase.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract TitleV1_1_ReadOnlyReplica is TitleBase, AccessControlUpgradeable {
    //////////////////////////////
    /// Libraries
    //////////////////////////////

    // Since ^0.7.0 libraries are not inherited.
    using StringsUpgradeable for uint256;
    using StringsUpgradeable for uint8;

    //////////////////////////////
    /// Constants
    //////////////////////////////

    bytes32 public constant WRITER_ROLE = keccak256("WRITER_ROLE");

    //////////////////////////////
    /// State
    //////////////////////////////

    address private _writerAddress;

    //////////////////////////////
    /// Errors
    //////////////////////////////

    error DisabledMethod();

    //////////////////////////////
    /// Setup
    //////////////////////////////

    /// @param writerAddress_ Address that is authorized to write
    function initialize(address writerAddress_) public initializer {
        __TitleBase_init();
        __AccessControl_init();
        _writerAddress = writerAddress_;
        _setupRole(WRITER_ROLE, writerAddress_);
    }

    /// @dev Only writer is approved
    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        override
        returns (bool)
    {
        return spender == _writerAddress;
    }

    /// @dev Identify as ERC721 interface.
    function supportsInterface(bytes4 interfaceId_)
        public
        view
        override(AccessControlUpgradeable, ERC721Upgradeable)
        returns (bool)
    {
        return ERC721Upgradeable.supportsInterface(interfaceId_);
    }

    //////////////////////////////
    /// Read-only methods
    //////////////////////////////

    function burn(uint256 id_) public override onlyRole(WRITER_ROLE) {
        _burn(id_);
    }

    /// @dev
    function mint(
        string memory name_,
        string memory description_,
        string memory externalUrl_,
        string memory image_,
        string memory attrLandClassification_,
        string memory attrLocation_,
        string memory attrDeed_,
        string memory attrParcels_,
        string memory attrOwner_,
        string memory attrKml_,
        string memory attrTag_,
        string memory attrBuildingClassification_,
        address to_
    ) public onlyRole(WRITER_ROLE) {
        _mintTo(
            name_,
            description_,
            externalUrl_,
            image_,
            attrLandClassification_,
            attrLocation_,
            attrDeed_,
            attrParcels_,
            attrOwner_,
            attrKml_,
            attrTag_,
            attrBuildingClassification_,
            to_
        );
    }

    function transferFrom(
        address from_,
        address to_,
        uint256 tokenId_
    ) public override onlyRole(WRITER_ROLE) {
        super.transferFrom(from_, to_, tokenId_);
    }

    function safeTransferFrom(
        address from_,
        address to_,
        uint256 tokenId_
    ) public override onlyRole(WRITER_ROLE) {
        super.safeTransferFrom(from_, to_, tokenId_);
    }

    function safeTransferFrom(
        address from_,
        address to_,
        uint256 tokenId_,
        bytes memory data_
    ) public override onlyRole(WRITER_ROLE) {
        super.safeTransferFrom(from_, to_, tokenId_, data_);
    }

    //////////////////////////////
    /// Disabled Methods
    //////////////////////////////

    function approve(address to_, uint256 tokenId_) public override {
        revert DisabledMethod();
    }

    function setApprovalForAll(address operator_, bool approved_)
        public
        override
    {
        revert DisabledMethod();
    }

    function mint(
        string memory name_,
        string memory description_,
        string memory externalUrl_,
        string memory image_,
        string memory attrLandClassification_,
        string memory attrLocation_,
        string memory attrDeed_,
        string memory attrParcels_,
        string memory attrOwner_,
        string memory attrKml_,
        string memory attrTag_,
        string memory attrBuildingClassification_
    ) public override {
        revert DisabledMethod();
    }
}
