// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Issuer {

    //address public holder;
    //mapping(address=>bytes32) addrToHashes;
    //mapping(bytes32=>bool) hashes;


    //constructor() {//holder = msg.sender;}
    enum Status {
        Demanded,
        Hashed, 
        Written, 
        Verified
    }

    struct Document {
        address holder;
        address issuer;
        string documentType;
        string expiryDate;
        Status status;
    }

    mapping(bytes32=>Document) documents;
    mapping(bytes32=>bool) hashes;
    
    function createDocument(bytes32 _docHash, address _holder, string memory _docType, string memory _expDate) external {
        Document memory doc;
        doc.holder = _holder;
        doc.documentType = _docType;
        doc.expiryDate = _expDate;
        doc.status = Status.Written;
    
        documents[_docHash] = doc;
        hashes[_docHash] = true;
    }

    function containsHash(bytes32 _hash) public returns(bool){
        return hashes[_hash];
    }

    /*
    // store a hash of doc in mappings
    function storeHash(bytes32 _docHash) private {
        hashes[_docHash] = true;
    }
    // calculate and store the hash for a document
    function notarize(string memory _hashInput) public {
        bytes32 docHash = sha256For(_hashInput);
        storeHash(docHash);
        addrToHashes[msg.sender]=docHash;
    }
    // helper function to get a document's sha256
    function sha256For(string memory _hashInput) private pure returns (bytes32) {
        return sha256(bytes(_hashInput));
    }
    // check if a document has been notarized
    function checkDocument(string memory _hash) public view returns (bool) {
        bytes32 out = sha256For(_hash);
        return hasHash(out);
    }
    // returns true if proof is stored
    function hasHash(bytes32 _hash) private view returns(bool) {
        return hashes[_hash];
    }*/
}