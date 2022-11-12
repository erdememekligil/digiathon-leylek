const { ethers } = require("hardhat");
const utils = require("./utils.js");

async function main() {
    await utils.setHash("ddddd");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });