var IoTCamera = artifacts.require("IoTCamera");

contract('IoTCamera', function(accounts) {
    var instance;
    IoTCamera.deployed().then(function(inst) {
        instance = inst;
    });
    console.log("-Test\tIoTCamera: ", IoTCamera.address);
    console.log("-Test\taccounts[0]: ", accounts[0]);
    it("should be available", function() {
        return instance.isAvailable.call()
        .then(function(available) {
            assert.equal(available.toString(), "true", "It's not available.");
        });
    });
    it("should get IoTCoin contract address", function() {
        return instance.getCoinAddress.call()
        .then(function(address) {
            console.log(address);
            edgeServer = address;
            assert.isAbove(address, 0x0, "Could not afford.");
        });
    }); 
    it("should get coinbase of edge server", function() {
        return instance.getServerAddress.call()
        .then(function(address) {
            console.log(address);
            assert.equal(address.toString(), accounts[0].toString(),
                        "Could not afford.");
        });
    }); 
    it("should open the server", function() {
        return instance.openServer(accounts[1], 8080, {from: accounts[0]})
        .then(function(result) {
            assert.ok(result)
        });
    });
    it("should not be available", function() {
        return instance.isAvailable.call()
        .then(function(available) {
            assert.equal(available.toString(), "false", "It's not available.");
        });
    });
    it("should close the server", function() {
        return instance.closeServer({from: accounts[0]})
        .then(function(result) {
            assert.ok(result)
        });
    });
});