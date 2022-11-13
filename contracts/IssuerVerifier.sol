// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Issuer {

    struct Document {
        address holder;
        address issuer;
        string documentType;
        string expiryDate;
        bool isValid;
    }

    mapping(bytes32 => Document) hashesMapDocuments;
    mapping(bytes32=>bool) hashesMapBool;
    uint256 docCounter = 0;
    
    function createDocument(string memory _hashInput, address _holder, string memory _docType, string memory _expDate) external {
        Document memory doc;
        doc.holder = _holder;
        doc.issuer = msg.sender;
        doc.documentType = _docType;
        doc.expiryDate = _expDate;
        doc.isValid = true;

        bytes32 hash = sha256For(_hashInput);

        docCounter ++;
        hashesMapDocuments[hash] = doc;
        hashesMapBool[hash] = true;
    }

    function containsHash(string memory _hashInput) checkDocExists public view returns(bool){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapBool[hash];
    }

    function sha256For(string memory _hashInput) private pure returns (bytes32) {
        return sha256(bytes(_hashInput));
    }

    function getHolderAddress(string memory _hashInput) checkStatus(_hashInput) checkHashContains(_hashInput) checkDocExists external view returns(address){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].holder;
    }
    function getIssuerAddress(string memory _hashInput) checkStatus(_hashInput) checkHashContains(_hashInput) checkDocExists external view returns(address){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].issuer;
    }
    //getter/setter
    function getExpiryDate(string memory _hashInput) checkStatus(_hashInput) checkHashContains(_hashInput) checkDocExists external view returns(string memory){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].expiryDate;
    }

    function getDocumentType(string memory _hashInput) checkStatus(_hashInput) checkHashContains(_hashInput) checkDocExists external view returns(string memory){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].documentType;
    }

    function getValidStatus(string memory _hashInput) checkHashContains(_hashInput) checkDocExists  external view returns(bool){
        bytes32 hash = sha256For(_hashInput);
        return hashesMapDocuments[hash].isValid;
    }

    function changeValidStatus(string memory _hashInput) checkHashContains(_hashInput) checkDocExists external {
        bytes32 hash = sha256For(_hashInput);
        if(hashesMapDocuments[hash].isValid == true) {
            hashesMapDocuments[hash].isValid = false;
        } else if(hashesMapDocuments[hash].isValid == false) {
            hashesMapDocuments[hash].isValid = true;
        }
    }

    modifier checkDocExists {
        require(docCounter > 0,"There is no document registered!");
        _;
    }

    modifier checkHashContains(string memory _hashInput) {
        require(containsHash(_hashInput)==true, "Document is not found having this hash!");
        _;
    } 

    modifier checkStatus(string memory _hashInput) {
        require(this.getValidStatus(_hashInput)==true, "This document is not valid");
        _;
    }
}

contract Verifier {
    Issuer issuer;
    Holder holder;

    constructor(address _IssuerContract, address _HolderContract) {
        issuer = Issuer(_IssuerContract);
        holder = Holder(_HolderContract);
    }

    function verifyDocument(string memory _hash) external view returns(bool) {
        //issuer.setStatus(_hash,Verified);
        return issuer.containsHash(_hash);
    }
    function demandDocument(address _holder, string[] memory _documentList) external{
        holder.demandDocument(_holder, _documentList);
    }

}

contract Holder{

    mapping(address=>string[]) documentDemand;

    function demandDocument(address _holder, string[] memory _documentList) external {
        documentDemand[_holder]=_documentList;
    }
    function getDocumentList() external view returns(string[] memory){
        return documentDemand[msg.sender];
    }

}








