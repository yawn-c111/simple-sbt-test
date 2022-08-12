// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SimpleData is Ownable {

    constructor() {
        console.log('SimpleData.sol deployed.');
    }

    function getCharity(address _address) public returns (uint256) {
        return 1;
    }

    function getContribution(address _address) public returns (uint256) {
        return 2;
    }
}