// contracts/TitleV1_1.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "./libs/Base64.sol";
import "./OpenSea/ProxyRegistry.sol";

struct Title {
  string name;
  string description;
  string externalUrl;
  string image;
  // Attributes
  string attrLandClassification;
  string attrLocation;
  string attrDeed;
  string attrParcels;
  string attrOwner;
  string attrKml;
  string attrTag;
  uint256 attrCreatedDate;
  uint8 attrMaxSupply;
  string attrBuildingClassification;
}

/// @title TitleV1_1
/// @author 721 Labs (https://721.dev)
contract TitleV1_1 is
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

  mapping(uint256 => Title) private _titles;

  //////////////////////////////
  /// Errors
  //////////////////////////////

  error OwnerOnly();

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
  /// Minting
  //////////////////////////////

  /// @notice Burns a title
  function burn(uint256 id_) public {
    if(msg.sender != ownerOf(id_)) revert OwnerOnly();
    _burn(id_);
  }

  /// @notice Mints a title
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
  ) public nonReentrant {
    uint256 id = _owners.length;

    _titles[id] = Title({
      name: name_,
      description: description_,
      externalUrl: externalUrl_,
      image: image_,
      attrLandClassification: attrLandClassification_,
      attrLocation: attrLocation_,
      attrDeed: attrDeed_,
      attrParcels: attrParcels_,
      attrOwner: attrOwner_,
      attrKml: attrKml_,
      attrTag: attrTag_,
      attrCreatedDate: block.timestamp,
      attrMaxSupply: 1,
      attrBuildingClassification: attrBuildingClassification_
    });

    _safeMint(msg.sender, id);
  }

  //////////////////////////////
  /// Metadata
  //////////////////////////////

  /// @dev Creates a metadata attribute object
  function _makeAttr(
    string memory traitType_,
    string memory value_,
    string memory displayType_
  ) private pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          "{",
          '"trait_type":"',
          traitType_,
          '","value":"',
          value_,
          '","display_type":"',
          displayType_,
          '"}'
        )
      );
  }

  function _makeStrAttr(string memory traitType_, string memory value_)
    private
    pure
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          "{",
          '"trait_type":"',
          traitType_,
          '","value":"',
          value_,
          '"}'
        )
      );
  }

  function tokenURI(uint256 id_) public view override returns (string memory) {
    require(_exists(id_), "ERC721Metadata: URI query for nonexistent token");

    Title memory title = _titles[id_];

    string memory owner = StringsUpgradeable.toHexString(
      uint256(uint160(ownerOf(id_))),
      20
    );

    string memory attributesA = string(
      abi.encodePacked(
        _makeStrAttr("Land Classification", title.attrLandClassification),
        ",",
        _makeStrAttr("Location", title.attrLocation),
        ",",
        _makeStrAttr("Legal/Deed", title.attrDeed),
        ",",
        _makeStrAttr("Parcels", title.attrParcels),
        ",",
        _makeStrAttr("Owner", title.attrOwner),
        ",",
        _makeStrAttr("KML Download", title.attrKml),
        ",",
        _makeStrAttr("Tag", title.attrTag),
        ",",
        _makeAttr("Created At", title.attrCreatedDate.toString(), "date"),
        ",",
        _makeAttr("Max Supply", title.attrMaxSupply.toString(), "number")
      )
    );

    string memory attributesB = string(
      abi.encodePacked(
        ",",
        _makeStrAttr("Building Classification", title.attrBuildingClassification)
      )
    );

    string memory attributes = string(abi.encodePacked(attributesA, attributesB));

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                "{",
                '"tokenId":"',
                id_.toString(),
                '","owner":"',
                owner,
                '","name":"',
                title.name,
                '","description":"',
                title.description,
                '","external_url":"',
                title.externalUrl,
                '","image":"',
                title.image,
                '","attributes":[',
                attributes,
                "]}"
              )
            )
          )
        )
      );
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
