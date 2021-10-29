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

function getChainConfig(url: string, network: keyof typeof chainIds): NetworkUserConfig {
  return {
    accounts: {
      mnemonic,
      initialIndex: 8,
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
    besu: getChainConfig("http://192.168.66.111:8545", "besu"),
  },
};

export default config;
