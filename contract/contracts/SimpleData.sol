// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import "hardhat/console.sol";

contract SimpleData is Context, Ownable {

    mapping (address => uint8) private age;

    constructor() {
        console.log('SimpleData.sol deployed.');
    }

    function writeAge(uint8 _age) public {
        require(_msgSender() == tx.origin, "You cannot write other people's ages.");
        age[_msgSender()] = _age;
    }

    function readAge(address _address) public view onlyOwner returns (uint8) {
        return age[_address];
    }
}