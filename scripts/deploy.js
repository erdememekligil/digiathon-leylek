const { ethers } = require("hardhat");
const config = require("./config.js");

async function main() {
    const [deployer] = await ethers.getSigners();

    const Issuer = await ethers.getContractFactory("Issuer");
    const issuer = await Issuer.deploy();

    const Holder = await ethers.getContractFactory("Holder");
    const holder = await Holder.deploy();

    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy(issuer.address, holder.address);

    console.log("Verifier contract address:", verifier.address);
    console.log("Issuer contract address:",issuer.address);
    console.log("Holder contract address:",holder.address);


    await issuer.functions.createDocument(
        "address",
        "0xB6022B02ce985297691F76fED1a03500781D289e",
        "sabıka kaydı",
        "01012023"
    )
    console.log(issuer);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });