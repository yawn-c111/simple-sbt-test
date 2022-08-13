// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SimpleData is Ownable {

    mapping (address => uint8) private age;

    constructor() {
        console.log('SimpleData.sol deployed.');
    }

    function writeAge(uint8 _age) public {
        age[_msgSender()] = _age;
    }

    function readAge(address _address) public view returns (uint8) {
        require(_address == _msgSender(), "You cannot read other people's ages.");
        return age[_address];
    }
}