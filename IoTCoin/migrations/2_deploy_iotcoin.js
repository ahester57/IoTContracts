var IoTCoin = artifacts.require("IoTCoin");
var IoTCamera = artifacts.require("IoTCamera");

module.exports = function(deployer) {
  deployer.deploy(IoTCoin, 100000000)
  .then(function() {
      console.log("-Deploy\tIoTCoin: ", IoTCoin.address);
      deployer.deploy(IoTCamera, IoTCoin.address)
      .then(function() {
        console.log("-Deploy\tIoTCamera: ", IoTCamera.address);
      });
  });
};
