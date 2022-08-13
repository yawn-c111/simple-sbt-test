// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import "hardhat/console.sol";

contract SimpleData is Context {

    mapping (address => uint8) private age;

    constructor() {
        console.log('SimpleData.sol deployed.');
    }

    function writeAge(uint8 _age) public {
        require(_msgSender() == tx.origin, "You cannot write other people's ages.");
        age[_msgSender()] = _age;
    }

    function readAge(address _address) public view returns (uint8) {
        // require(tx.origin == _address, "You cannot read other people's ages.");
        return age[_address];
    }
}