const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const mintFirstSBTCheck = async (_by, _SimpleSBT, _person) => {
  expect(await _SimpleSBT.connect(_by).balanceOf(_person.address)).to.equal(0);
  await (await _SimpleSBT.connect(_by).mintSBT()).wait();
  expect(await _SimpleSBT.connect(_by).balanceOf(_person.address)).to.equal(1);
};

describe("SimpleSBT Test", function () {
  async function deployFixture() {
    const [deployer, citizen1, citizen2, citizen3, nonCitizen] =
      await hre.ethers.getSigners();

    const SimpleDataFactory = await hre.ethers.getContractFactory("SimpleData");
    const SimpleData = await SimpleDataFactory.deploy();
    await SimpleData.deployed();

    const SimpleSBTFactory = await hre.ethers.getContractFactory("SimpleSBT");
    const SimpleSBT = await SimpleSBTFactory.deploy(SimpleData.address);
    await SimpleSBT.deployed();

    await mintFirstSBTCheck(citizen1, SimpleSBT, citizen1);
    await mintFirstSBTCheck(citizen2, SimpleSBT, citizen2);
    await mintFirstSBTCheck(citizen3, SimpleSBT, citizen3);

    return {
      SimpleData,
      SimpleSBT,
      deployer,
      citizen1,
      citizen2,
      citizen3,
      nonCitizen,
    };
  }

  it("name", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(await SimpleSBT.connect(nonCitizen).name()).to.equal("SimpleSBT");
  });

  it("symbol", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(await SimpleSBT.connect(nonCitizen).symbol()).to.equal("SSBT");
  });

  it("checkSBT", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);
    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen2.address)
    ).to.equal(1);
    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen3.address)
    ).to.equal(1);
    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(nonCitizen.address)
    ).to.equal(0);
  });

  it("mintSBT", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    await mintFirstSBTCheck(nonCitizen, SimpleSBT, nonCitizen);

    expect(await SimpleSBT.connect(nonCitizen).ownerOf(4)).to.equal(
      nonCitizen.address
    );
  });

  it("mint 2 SBTs Reverted", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);

    await expect(SimpleSBT.connect(citizen1).mintSBT()).to.be.revertedWith(
      "You have already owned SBT."
    );

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);
  });

  it("burn own SBT", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);

    await SimpleSBT.connect(citizen1).burnSBT(1);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(0);
  });

  it("burn other's SBT Reverted", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);

    await expect(SimpleSBT.connect(citizen2).burnSBT(1)).to.be.revertedWith(
      "burn: sender must be owner"
    );

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);
  });

  it("transferFrom SBT Reverted", async function () {
    const { SimpleSBT, deployer, citizen1, citizen2, citizen3, nonCitizen } =
      await loadFixture(deployFixture);

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);

    await expect(
      SimpleSBT.connect(citizen1).transferFrom(
        citizen1.address,
        citizen2.address,
        1
      )
    ).to.be.revertedWith("SBT transfers are locked.");

    expect(
      await SimpleSBT.connect(nonCitizen).balanceOf(citizen1.address)
    ).to.equal(1);
  });

  it("own age", async function () {
    const {
      SimpleData,
      SimpleSBT,
      deployer,
      citizen1,
      citizen2,
      citizen3,
      nonCitizen,
    } = await loadFixture(deployFixture);

    await SimpleData.connect(citizen1).writeAge(21);

    expect(
      await SimpleData.connect(citizen1).readAge(citizen1.address)
    ).to.equal(21);
  });

  // it("read someone else's age", async function () {
  //   const {
  //     SimpleData,
  //     SimpleSBT,
  //     deployer,
  //     citizen1,
  //     citizen2,
  //     citizen3,
  //     nonCitizen,
  //   } = await loadFixture(deployFixture);

  //   await SimpleData.connect(citizen1).writeAge(21);

  //   expect(
  //     await SimpleData.connect(citizen1).readAge(citizen1.address)
  //   ).to.equal(21);

  //   await expect(
  //     SimpleData.connect(citizen2).readAge(citizen1.address)
  //   ).to.be.revertedWith("You cannot read other people's ages.");
  // });

  // it("ageClass", async function () {
  //   const {
  //     SimpleData,
  //     SimpleSBT,
  //     deployer,
  //     citizen1,
  //     citizen2,
  //     citizen3,
  //     nonCitizen,
  //   } = await loadFixture(deployFixture);

  //   await SimpleData.connect(citizen1).writeAge(23);

  //   expect(
  //     await SimpleSBT.connect(citizen1).ageClass(citizen1.address)
  //   ).to.equal("orange");
  // });
});
