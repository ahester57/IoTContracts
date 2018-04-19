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
     it("should get coinbase of edge server", function() {
        return instance.getServerAddress.call().then(function(address) {
            console.log(address);
            //assert.equal(available.toString(), "true", "It's not available.");
            assert.isAbove(address, 0, "Could not afford.");
        });
    }); 
});