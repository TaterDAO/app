// contracts/title/TitleBase.sol
// SPDX-License-Identifier: UNLICENSED

// Contracts
import {ERC721Upgradeable} from "./../ERC721/ERC721Upgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
// Structs
import {TitleStructV1_1} from "./../structs/Title.sol";
// Libs
import "./../libs/Base64.sol";

/// @title TitleBase
/// @author 721 Labs (https://721.dev)
abstract contract TitleBase is
    ERC721Upgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    //////////////////////////////
    /// Libraries
    //////////////////////////////

    using StringsUpgradeable for uint256;
    using StringsUpgradeable for uint8;

    //////////////////////////////
    /// State
    //////////////////////////////

    mapping(uint256 => TitleStructV1_1) internal _titles;

    //////////////////////////////
    /// Errors
    //////////////////////////////

    error OwnerOnly();

    //////////////////////////////
    /// Constructor
    //////////////////////////////

    function __TitleBase_init() internal initializer {
        __ERC721_init("TaterNFT", "TATR");
        __Ownable_init();
    }

    //////////////////////////////
    /// Minting
    //////////////////////////////

    /// @notice Burns a title
    function burn(uint256 id_) public virtual {
        if (msg.sender != ownerOf(id_)) revert OwnerOnly();
        _burn(id_);
    }

    function _mintTo(
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
    ) internal nonReentrant {
        uint256 id = _owners.length;

        _titles[id] = TitleStructV1_1({
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

        _safeMint(to_, id);
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
    ) public virtual nonReentrant {
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
            msg.sender
        );
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

    function tokenURI(uint256 id_)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(id_),
            "ERC721Metadata: URI query for nonexistent token"
        );

        TitleStructV1_1 memory title = _titles[id_];

        string memory owner = StringsUpgradeable.toHexString(
            uint256(uint160(ownerOf(id_))),
            20
        );

        string memory attributesA = string(
            abi.encodePacked(
                _makeStrAttr(
                    "Land Classification",
                    title.attrLandClassification
                ),
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
                _makeAttr(
                    "Created At",
                    title.attrCreatedDate.toString(),
                    "date"
                ),
                ",",
                _makeAttr(
                    "Max Supply",
                    title.attrMaxSupply.toString(),
                    "number"
                )
            )
        );

        string memory attributesB = string(
            abi.encodePacked(
                ",",
                _makeStrAttr(
                    "Building Classification",
                    title.attrBuildingClassification
                )
            )
        );

        string memory attributes = string(
            abi.encodePacked(attributesA, attributesB)
        );

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
}
