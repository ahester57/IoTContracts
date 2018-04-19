var IoTCoin = artifacts.require("IoTCoin");

contract('IoTCoin', function(accounts) {
    var instance;
    IoTCoin.deployed().then(function(inst) {
        instance = inst;
    });
    console.log("-Test\tIoTCoin: ", IoTCoin.address);
    it("should give creator insane amount of coins", function() {
        return instance.getBalance.call(accounts[0])
        .then(function(bal) {
            assert.isAbove(bal.toString(10), 100000, "Did not supply creator");
        });
    });
    it("should send another account 10,000 IoTCoin", function() {
        return instance.transfer(accounts[1], 10000, {from: accounts[0]})
        .then(function() {
            return instance.getBalance.call(accounts[1]).then(function(bal) {
                assert.equal(bal, 10000, "Transfer failed.");
            });
        });
    });
    it("should get the edge server address", function() {
        return instance.getEdgeServer.call()
        .then(function(address) {
            assert.equal(address.toString(), accounts[0].toString(),
                        "Edge server address wrong.");
            console.log(address);
        });
    });
});