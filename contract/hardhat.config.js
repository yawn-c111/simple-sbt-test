require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_INFURA,
      accounts: [process.env.PRIVATE_KEY],
    },
    // ropsten: {
    //   url: process.env.ROPSTEN_INFURA,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // goerli: {
    //   url: process.env.GOERLI_INFURA,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
};
