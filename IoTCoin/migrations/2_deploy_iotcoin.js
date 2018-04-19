var IoTCoin = artifacts.require("IoTCoin");
var IoTCamera = artifacts.require("IoTCamera");

module.exports = function(deployer) {
  deployer.deploy(IoTCoin, 100000000)
  .then(function() {
      deployer.deploy(IoTCamera, IoTCoin.address);
  });
};
