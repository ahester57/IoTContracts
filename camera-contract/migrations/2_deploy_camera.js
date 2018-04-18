var IoTCamera = artifacts.require("IoTCamera");

module.exports = function(deployer) {
  deployer.deploy(IoTCamera, "0xdcf30bc0097e837bdd2ba257247791acb62e43ca");
};