var IoTCoin = artifacts.require("IoTCoin");
var contractAddress = "0xf49f118550d3ceb08bf79d6a1e2c91dae09c1788";

module.exports = function(callback) {
    var _of = process.argv[4];
    if (_of == undefined)
        callback("Provide an address.");

    var instance = IoTCoin.at(contractAddress);
    var balance = instance.getBalance.call(_of);
    balance.then(function(result) {
        console.log("Provided accounts balance is: ", result.toString(10));
    }).catch(function(error) {
        console.log(error);
        callback("FAILURE");
    });
};