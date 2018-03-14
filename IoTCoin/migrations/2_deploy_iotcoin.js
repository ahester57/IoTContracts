var IoTCoin = artifacts.require("IoTCoin");

module.exports = function(deployer) {
  deployer.deploy(IoTCoin, 100000000);
};
