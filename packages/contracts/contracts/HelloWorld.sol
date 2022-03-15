// contracts/HelloWorld.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract HelloWorld is Initializable {
  //////////////////////////////
  /// State
  //////////////////////////////

  /// @notice A customizable message
  string private _message;

  //////////////////////////////
  /// Constructor
  //////////////////////////////

  function initialize() public initializer {
    _message = "Hello World";
  }

  //////////////////////////////
  /// Public Methods
  //////////////////////////////

  /// @notice Returns message.
  /// @return message text.
  function hello() public view returns (string memory) {
    return _message;
  }

  /// @notice Overwrites the message.
  /// @param newMessage_ Self-descriptive.
  function setMessage(string calldata newMessage_) public {
    _message = newMessage_;
  }
}
