// deploy.js
const main = async () => {
  const SimpleDataFactory = await hre.ethers.getContractFactory("SimpleData");
  const SimpleData = await SimpleDataFactory.deploy();
  await SimpleData.deployed();
  console.log("SimpleData contract deployed to ", SimpleData.address);

  const SimpleSBTFactory = await hre.ethers.getContractFactory("SimpleSBT");
  const SimpleSBT = await SimpleSBTFactory.deploy(SimpleData.address);
  await SimpleSBT.deployed();
  console.log("SimpleSBT contract deployed to ", SimpleSBT.address);

  await (await SimpleSBT.mintSBT()).wait();

  await (await SimpleData.transferOwnership(SimpleSBT.address)).wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.info(error);
    process.exit(1);
  }
};

runMain();
