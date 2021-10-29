import hardhat from "hardhat";

async function main() {
  console.log("deploy start");

  const Todo = await hardhat.ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();
  console.log(`Todo address: ${todo.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
