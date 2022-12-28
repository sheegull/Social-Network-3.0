const main = async () => {
    const DsnsContractFactory = await hre.ethers.getContractFactory("DecentraSns");
    const DsnsContract = await DsnsContractFactory.deploy();
    const DecentraSns = await DsnsContract.deployed();
    console.log("Contract deployed to: ", DecentraSns.address);
};

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
