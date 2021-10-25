import { waffle } from "hardhat";
import { expect } from "chai";

import AssetTokenArtifact from "../artifacts/contracts/AssetToken.sol/AssetToken.json";
import { AssetToken } from "../typechain/AssetToken";

const { deployContract } = waffle;

describe("AssetToken", () => {
  let assetToken: AssetToken;

  const provider = waffle.provider;
  const [admin] = provider.getWallets();

  beforeEach(async () => {
    assetToken = (await deployContract(admin, AssetTokenArtifact, [10000, "FirstAssetToken", "FAT"])) as AssetToken;
  });

  context("new AssetToken", async () => {
    it("has given data", async () => {
      expect(await assetToken.totalSupply()).to.be.equal(10000);
      expect(await assetToken.name()).to.be.equal("FirstAssetToken");
      expect(await assetToken.symbol()).to.be.equal("FAT");
      //   expect(await assetToken.decimals()).to.be.equal(0);
    });

    it("increases the deployer balance", async () => {
      expect(await assetToken.balanceOf(admin.address)).to.be.equal(10000);
    });
  });
});
