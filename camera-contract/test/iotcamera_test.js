var IoTCamera = artifacts.require("IoTCamera");

contract('IoTCamera', function(accounts) {
    var instance;
    IoTCamera.deployed().then(function(inst) {
        instance = inst;
    });
    it("should be available", function() {
        return instance.isAvailable.call().then(function(available) {
            assert.equal(available.toString(), "true", "It's not available.");
        });
    });
    it("should get balance of account", function() {
        return instance.buyServer.call().then(function(balance) {
            console.log(balance);
            //assert.equal(available.toString(), "true", "It's not available.");
            assert.equal(balance.toString(), "true", "Could not afford.");
        });
    });
});