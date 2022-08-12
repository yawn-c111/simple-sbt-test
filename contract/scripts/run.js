// run.js
const main = async () => {
  const [deployer, person1, person2] = await hre.ethers.getSigners();

  const SimpleSBTFactory = await hre.ethers.getContractFactory("SimpleSBT");
  const SimpleSBT = await SimpleSBTFactory.deploy();
  await SimpleSBT.deployed();
  console.log("SimpleSBT contract deployed to ", SimpleSBT.address);
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
