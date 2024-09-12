import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const SEPOLIA_RPC_URL: string = process.env.SEPOLIA_RPC_URL as string;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string;
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [
        PRIVATE_KEY,
      ],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
