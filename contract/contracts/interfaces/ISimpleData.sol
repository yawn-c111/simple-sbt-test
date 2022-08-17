// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface ISimpleData {

    function writeAge(uint8 _age) external;

    function readAge(address _address) external view returns (uint8);

}