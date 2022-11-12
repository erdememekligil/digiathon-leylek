const { ethers } = require("hardhat");
const config = require("./config.js");


module.exports = {
    deployIssuer: async function(){
        const Issuer = await ethers.getContractFactory("Issuer");
        const issuer = await Issuer.deploy();
        console.log("Issuer contract address:",issuer.address);
    },
    deployHolder: async function(){
        const Holder = await ethers.getContractFactory("Holder");
        const holder = await Holder.deploy();
        console.log("Holder contract address:",issuer.address);
    },
    deployHolder: async function(
        _issuerAddr,_holderAddr
    )
    {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy(_issuerAddr, _holderAddr);
    },

    docToHash : function 
    (
        _documentHash
    )
    {
    
    },
    setHash : async function 
    (
        _documentHash
    )
    {
        const issuer = await ethers.getContractAt("Issuer",config.adresses.issuer.contract);
        await issuer.createDocument(
            _documentHash,
            "0xB6022B02ce985297691F76fED1a03500781D289e",
            "sabıka kaydı",
            "01012023"
        )
        console.log("isssuer contract is created");
    
    },
    checkHash : async function 
    (
        _documentHash
    )
    {
        const verifier = await ethers.getContractAt("Verifier",config.adresses.verifier.contract);
        var verifyResult = await verifier.verifyDocument(
            _documentHash
        )
    }
}