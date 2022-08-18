// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ERC5192 } from "./base/ERC5192.sol";
import { ISimpleData } from "./interfaces/ISimpleData.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract SimpleSBT is ERC5192 {

    ISimpleData public SimpleData;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;

    constructor(ISimpleData _simpleDataAddress) ERC5192('SimpleSBT', 'SSBT') {
        SimpleData = _simpleDataAddress;
        _tokenIds.increment();
        console.log('SimpleSBT contract deployed.');
    }

    function readAgeClass(address owner) public view returns (string memory) {
        uint8 age = SimpleData.readAge(owner);

        if (age < 18) {
            return "white";
        } else if (age < 20) {
            return "yellow";
        } else if (age < 25) {
            return "orange";
        } else if (age < 30) {
            return "red";
        } else {
            return "purple";
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "tokenURI: token doesn't exist");
        
        string memory imageJson = Base64.encode(
  		    abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base {fill: black; font-family: serif; font-size: 22px;}</style><rect width="100%" height="100%" fill="', abi.encodePacked(readAgeClass(ownerOf(tokenId))),'" /><text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">SimpleSBT #', Strings.toString(tokenId),'</text></svg>'
            )
	    );
        string memory json = Base64.encode(
  		    abi.encodePacked(
                '{"description": "SimpleSBT", "image": "data:image/svg+xml;base64,', imageJson,'", "name": "SimpleSBT #', Strings.toString(tokenId),'"}'
            )
	    );
        string memory uri = string(
        abi.encodePacked("data:application/json;base64,", json)
        );
        return uri;
    }

    function mintSBT() external {
        require(balanceOf(_msgSender()) == 0, "You have already owned SBT.");
        uint256 newTokenID = _tokenIds.current();
        _safeMint(_msgSender(), newTokenID);
        _tokenIds.increment();
	    console.log("SBT #%s has been minted by %s", newTokenID, _msgSender());
    }

    function burnSBT(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == _msgSender(), "burn: sender must be owner");
        _burn(_tokenId);
    }
}