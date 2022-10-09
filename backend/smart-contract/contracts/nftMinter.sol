// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract nftMinter is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    

    constructor() ERC721("Chat DApp", "NFT Minter") {

    }

    function mint_nft(string memory tokenURI) public  {
        
        uint256 newItemId = _tokenId.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenId.increment();
    }
    
    function getTokenID() public view returns(uint256){

        uint256 tokenID = _tokenId.current() - 1;
        return tokenID;
    }
}
