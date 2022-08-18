// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import "hardhat/console.sol";

contract SimpleData is Context, Ownable {

    mapping (address => uint8) private _age;
    mapping (address => string) private _name;

    constructor() {
        console.log('SimpleData.sol deployed.');
    }

    function writeAge(uint8 age) public {
        require(msg.sender == tx.origin, "You cannot write other people's ages.");
        _age[_msgSender()] = age;
    }

    function readAge(address owner) public view onlyOwner returns (uint8) {
        return _age[owner];
    }
}