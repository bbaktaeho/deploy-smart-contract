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
    from: "0x85F4c4C2e04CcAbbd32c7833D3b364921b0E3663",
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
    besu: getChainConfig("http://localhost:8545", "besu"),
  },
};

export default config;
