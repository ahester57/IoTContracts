var IoTCamera = artifacts.require("IoTCamera");

module.exports = function(deployer) {
  deployer.deploy(IoTCamera);
};