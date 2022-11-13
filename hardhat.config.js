//require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const DIGI_PRIVATE_KEY = process.env.DIGI0_WALLET_PRIVATE_KEY;
const PRIVATE_KEY = process.env.AVAX_WALLET_PRIVATE_KEY;


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