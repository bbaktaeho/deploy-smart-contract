# deploy-smart-contract-tester

### Prerequisites

- node.js
- ethereum network (besu, truffle, ghanache, hardhat, ...)

### Configuration

- generate `.env`

  ```
  # extract mnemonic from metamask
  MNEMONIC=...
  ```

- modify `hardhat.config.ts`

  ```typescript
  const chainIds = {
    besu: 1337,
  };

  ....

  function getChainConfig(url: string, network: keyof typeof chainIds): NetworkUserConfig {
    return {
      accounts: {
        mnemonic,
        initialIndex: 8, // 지갑의 계정 순번
      },
      chainId: chainIds[network],
      url,
    };
  }

  ....

  const config: HardhatUserConfig = {
    solidity: {
      version: "0.8.0",
    },
    networks: {
      // url, chainId
      besu: getChainConfig("http://localhost:8545", "besu"),
    },
  };

  ....

  ```

### Usage

```shell
npm install
npx hardhat compile
npx hardhat test ./test/AssetToken.test.ts
npx hardhat run scripts/deployScript.ts --network besu
```
