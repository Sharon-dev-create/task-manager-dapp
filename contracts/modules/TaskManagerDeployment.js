const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TaskManagerDeployment", (m) => {
  const taskManager = m.contract("TaskManager", []);

  return { taskManager };
});
