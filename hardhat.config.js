//require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const cfg = require("./scripts/config.js");

const DIGI_PRIVATE_KEY = "bde41d1715da9e07daaa20ccd3edfb8a44840e9f4ea422e15bb00cf236f0ad49";
const PRIVATE_KEY = "4fda222ed10fb52f8fd364c2d8a27074dda9023d188a594095e3ecec2fa79a94";


module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
        accounts: [`${PRIVATE_KEY}`]
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
        accounts: [`${PRIVATE_KEY}`]
    },
    digiathon: {
      url: 'http://176.236.121.139:9656/ext/bc/C/rpc',
      accounts:  [`${DIGI_PRIVATE_KEY}`]
    }
  }
};

task("setHash", "Writes hash on blockchain")
  .addParam("hash", "The hash of file!")
  .setAction(async function ({hash}) {
    const issuer = await ethers.getContractAt("Issuer",cfg.adresses.issuer.contract);
    //console.log("accessed the issuer contract: ",issuer.address);
    await issuer.functions.createDocument(
        hash,
        "0xB6022B02ce985297691F76fED1a03500781D289e",
        "sabika kaydi",
        "01.01.2023"
    )
    console.log("hashIsWritten");    
});

task("checkHash", "Checks hash on blockchain")
  .addParam("hash", "The hash of file!")
  .setAction(async function ({hash}) {
    const verifier = await ethers.getContractAt("Verifier",cfg.adresses.verifier.contract);
    console.log("accessed the verifier contract: ",verifier.address);
    var returnBool = await verifier.functions.verifyDocument(
        hash
    );
    console.log(returnBool[0]);
});



/*module.exports = {
    // ...
}*/