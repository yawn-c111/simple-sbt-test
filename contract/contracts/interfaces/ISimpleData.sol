// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface ISimpleData {

    function getCharity(address _address) external view returns (uint256);

    function getContribution(address _address) external view returns (uint256);
}