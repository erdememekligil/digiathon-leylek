const { ethers } = require("hardhat");
const config = require("./config.js");
const crypto = require('crypto');
const fs = require('fs');



module.exports = {
    deployIssuer: async function(){
        const Issuer = await ethers.getContractFactory("Issuer");
        const issuer = await Issuer.deploy();
        console.log("Issuer contract address:",issuer.address);
    },
    deployHolder: async function(){
        const Holder = await ethers.getContractFactory("Holder");
        const holder = await Holder.deploy();
        console.log("Holder contract address:",holder.address);
    },
    deployHolder: async function(
        _issuerAddr,_holderAddr
    )
    {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy(_issuerAddr, _holderAddr);
    console.log("Holder contract address:",verifier.address);

    },

    docToHash : function 
    (

    )
    {
        const fileBuffer = fs.readFileSync('myfile.js');
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);

        const hex = hashSum.digest('hex');

        console.log(hex);
        // OPTION 2
        /*
        var fs = require('fs');
        var crypto = require('crypto');

        // the file you want to get the hash    
        var fd = fs.createReadStream('/some/file/name.txt');
        var hash = crypto.createHash('sha1');
        hash.setEncoding('hex');

        fd.on('end', function() {
            hash.end();
            console.log(hash.read()); // the desired sha1sum
        });

        // read all file and pipe it (write it) to the hash object
        fd.pipe(hash);
        */
        //OPTION 3
        /*
        var crypto = require('crypto');

        // change to 'md5' if you want an MD5 hash
        var hash = crypto.createHash('sha1');

        // change to 'binary' if you want a binary hash.
        hash.setEncoding('hex');

        // the text that you want to hash
        hash.write('hello world');

        // very important! You cannot read from the stream until you have called end()
        hash.end();

        // and now you get the resulting hash
        var sha1sum = hash.read();
        */
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
        console.log("Verify result:",verifyResult);

    }
}