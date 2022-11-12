// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Issuer {
    
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
        bool isValid;
        Status status;
    }

    mapping(bytes32=>Document) hashesMapDocuments;
    mapping(bytes32=>bool) hashesMapBool;
    uint256 docCounter = 0;
    
    function createDocument(string memory _hashInput, address _holder, string memory _docType, string memory _expDate) external {
        Document memory doc;
        doc.holder = _holder;
        doc.issuer = msg.sender;
        doc.documentType = _docType;
        doc.expiryDate = _expDate;
        doc.status = Status.Written;
        doc.isValid = true;

        bytes32 hash = sha256For(_hashInput);

        docCounter = docCounter ++;
        hashesMapDocuments[hash] = doc;
        hashesMapBool[hash] = true;
    }

    function containsHash(string memory _hashInput) public view returns(bool){
        require(docCounter > 0,"There is no document");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapBool[hash];
    }

    function sha256For(string memory _hashInput) private pure returns (bytes32) {
        return sha256(bytes(_hashInput));
    }

    function getHolderAddress(string memory _hashInput) external view returns(address){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].holder;
    }
    function getIssuerAddress(string memory _hashInput) external view returns(address){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].issuer;
    }
    //getter/setter
    function getStatus(string memory _hashInput) external view returns(Status){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].status;
    }
    /*function setStatus(string memory _hashInput) external pure {
        bytes32 hash = sha256For(_hashInput);
        hashesMapDocuments[hash].status = Status.Verified;
    }*/
    function getExpiryDate(string memory _hashInput) external view returns(string memory){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].expiryDate;
    }
    function getDocumentType(string memory _hashInput) external view returns(string memory){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].documentType;
    }

    function getValidStatus(string memory _hashInput) external view returns(bool){
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].isValid;
    }
    function setValidStatus(string memory _hashInput, bool _bool) external {
        require(docCounter > 0,"There is no document registered!");
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        bytes32 hash = sha256For(_hashInput);
        hashesMapDocuments[hash].isValid=_bool;
    }
}

contract Verifier {
    Issuer issuer;

    constructor(address _IssuerContract) {
        issuer = Issuer(_IssuerContract);
    }

    function verifyDocument(string memory _hash) external view returns(bool) {
        //issuer.setStatus(_hash,Verified);
        return issuer.containsHash(_hash);
    }

}
