const { ethers } = require("hardhat");

async function main() {
  const Dsns = await ethers.getContractFactory("dsns");
  const dsns = await Dsns.deploy();
  await dsns.deployed();

  console.log("deploy success 🎉🎉");
  console.log("Contract deployed to: ", dsns.address);
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
