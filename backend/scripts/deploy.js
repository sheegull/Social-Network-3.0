const { ethers } = require("hardhat");

async function main() {
    const Decentrasns = await ethers.getContractFactory("decentrasns");
    const decentrasns = await Decentrasns.deploy();
    await decentrasns.deployed();

    console.log("deploy success 🎉🎉");
    console.log("Contract deployed to: ", decentrasns.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
