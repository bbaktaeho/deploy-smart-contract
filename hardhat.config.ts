import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  besu: 1337,
};

const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "http://localhost:8545";
  return {
    accounts: {
      mnemonic,
    },
    chainId: chainIds[network],
    url,
  };
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    besu: getChainConfig("besu"),
  },
};

export default config;
