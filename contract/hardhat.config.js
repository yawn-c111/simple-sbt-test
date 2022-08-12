require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API
  // },
  networks: {
    goerli: {
      url: process.env.GOERLI_INFURA,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
