// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface ISimpleData {

    function writeAge(uint8 age) external;

    function readAge(address owner) external view returns (uint8);

}