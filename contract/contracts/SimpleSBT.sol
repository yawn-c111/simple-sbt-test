// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ERC5192 } from "./base/ERC5192.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract SimpleSBT is ERC5192 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC5192('SimpleSBT', 'SSBT') {
        _tokenIds.increment();
        console.log('SimpleSBT contract deployed.');
    }

    // function supportsInterface(bytes4 interfaceId) public view virtual override (ERC5192) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "tokenURI: token doesn't exist");
        
        string memory imageJson = Base64.encode(
  		    abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base {fill: black; font-family: serif; font-size: 22px;}</style><rect width="100%" height="100%" fill="white" /><text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">SimpleSBT #', Strings.toString(tokenId),'</text></svg>'
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
        uint256 newTokenID = _tokenIds.current();
        _mint(_msgSender(), newTokenID);
        _tokenIds.increment();
	    console.log("SBT #%s has been minted by %s", newTokenID, _msgSender());
    }
}