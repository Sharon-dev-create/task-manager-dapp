const hre = require("hardhat");

async function main() {
  console.log("Starting TaskManager deployment to Sepolia...\n");

  // Get the contract factory
  const TaskManager = await hre.ethers.getContractFactory("TaskManager");

  // Deploy the contract
  console.log("Deploying TaskManager contract...");
  const taskManager = await TaskManager.deploy();

  // Wait for deployment to complete
  await taskManager.deploymentTransaction().wait();

  const deploymentAddress = await taskManager.getAddress();
  console.log("\n✓ TaskManager deployed successfully!");
  console.log(`Contract address: ${deploymentAddress}`);
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${(await hre.ethers.provider.getNetwork()).chainId}`);

  // Optional: Verify contract on Etherscan after deployment
  console.log("\nWaiting for block confirmations before verification...");
  await taskManager.deploymentTransaction().wait(5);

  console.log("\nTo verify the contract on Etherscan, run:");
  console.log(
    `npx hardhat verify --network sepolia ${deploymentAddress}`
  );

  return deploymentAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
