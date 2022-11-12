// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verifier {

    
    //address public holder;
    //mapping(address=>bytes32) addrToHashes;
    //mapping(bytes32=>bool) hashes;


    //constructor() {//holder = msg.sender;}

    struct Document {
        bytes32 documentHash;
        address holder;
        address verifier;
        string documentType;
        string expiryDate;
    }

    function callIssuer() external {
        
    }
}
