var IoTCamera = artifacts.require("IoTCamera");

contract('IoTCamera', function(accounts) {
    var instance;
    var edgeServer;
    IoTCamera.deployed().then(function(inst) {
        instance = inst;
    });
    console.log("-Test\tIoTCamera: ", IoTCamera.address);
    console.log("-Test\taccounts[0]: ", accounts[0]);
    it("should be available", function() {
        return instance.isAvailable.call().then(function(available) {
            assert.equal(available.toString(), "true", "It's not available.");
        });
    });
    it("should get IoTCoin contract address", function() {
        return instance.getCoinAddress.call().then(function(address) {
            console.log(address);
            edgeServer = address;
            //assert.equal(available.toString(), "true", "It's not available.");
            assert.isAbove(address, 0, "Could not afford.");
        });
    }); 
    it("should get coinbase of edge server", function() {
        return instance.getServerAddress.call().then(function(address) {
            console.log(address);
            edgeServer = address;
            //assert.equal(available.toString(), "true", "It's not available.");
            assert.isAbove(address, 0, "Could not afford.");
        });
    }); 
    it("should open the server", function() {
        return instance.openServer(edgeServer, 8080, {from: accounts[0]}).then(function() {
            var event = instance.OpenServer();
            event.watch(function(error, result) {
                if (!error) {
                    console.log(result.args["_port"].toString(10));
                    return result;
                } else {
                    assert.equal(error, "", "No events emitted.")
                    return error;
                }
            });
        });
    });
    it("should not be available", function() {
        return instance.isAvailable.call().then(function(available) {
            assert.equal(available.toString(), "false", "It's not available.");
        });
    });
});