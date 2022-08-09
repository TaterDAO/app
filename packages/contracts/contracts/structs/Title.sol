// structs/Title.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// See: https://docs.opensea.io/docs/metadata-standards
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
}
