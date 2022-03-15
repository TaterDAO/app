// contracts/libs/Utils.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

library Utils {
  function toHex(bytes32 data) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          "0x",
          _toHex16(bytes16(data)),
          _toHex16(bytes16(data << 128))
        )
      );
  }

  function _toHex16(bytes16 data) private pure returns (bytes32 result) {
    result =
      (bytes32(data) &
        0xFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000) |
      ((bytes32(data) &
        0x0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000) >>
        64);
    result =
      (result &
        0xFFFFFFFF000000000000000000000000FFFFFFFF000000000000000000000000) |
      ((result &
        0x00000000FFFFFFFF000000000000000000000000FFFFFFFF0000000000000000) >>
        32);
    result =
      (result &
        0xFFFF000000000000FFFF000000000000FFFF000000000000FFFF000000000000) |
      ((result &
        0x0000FFFF000000000000FFFF000000000000FFFF000000000000FFFF00000000) >>
        16);
    result =
      (result &
        0xFF000000FF000000FF000000FF000000FF000000FF000000FF000000FF000000) |
      ((result &
        0x00FF000000FF000000FF000000FF000000FF000000FF000000FF000000FF0000) >>
        8);
    result =
      ((result &
        0xF000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000) >>
        4) |
      ((result &
        0x0F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F00) >>
        8);
    result = bytes32(
      0x3030303030303030303030303030303030303030303030303030303030303030 +
        uint256(result) +
        (((uint256(result) +
          0x0606060606060606060606060606060606060606060606060606060606060606) >>
          4) &
          0x0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F) *
        7
    );
  }

  /**
   * Lower
   *
   * Converts all the values of a string to their corresponding lower case
   * value.
   *
   * @param _base When being used for a data type this is the extended object
   *              otherwise this is the string base to convert to lower case
   * @return string
   */
  function lower(string memory _base) internal pure returns (string memory) {
    bytes memory _baseBytes = bytes(_base);
    for (uint256 i = 0; i < _baseBytes.length; i++) {
      _baseBytes[i] = _lower(_baseBytes[i]);
    }
    return string(_baseBytes);
  }

  /**
   * Lower
   *
   * Convert an alphabetic character to lower case and return the original
   * value when not alphabetic
   *
   * @param _b1 The byte to be converted to lower case
   * @return bytes1 The converted value if the passed value was alphabetic
   *                and in a upper case otherwise returns the original value
   */
  function _lower(bytes1 _b1) private pure returns (bytes1) {
    if (_b1 >= 0x41 && _b1 <= 0x5A) {
      return bytes1(uint8(_b1) + 32);
    }

    return _b1;
  }
}
