var IoTCoin = artifacts.require("IoTCoin");
var contractAddress = "0xf49f118550d3ceb08bf79d6a1e2c91dae09c1788";

module.exports = function(callback) {
    var _to = process.argv[4];
    var _value = process.argv[5];
    if (_to == undefined)
        callback("Provide an address to send to.");
    if (_value == undefined || _value < 0)
        callback("Provide an amount.");

    var instance = IoTCoin.at(contractAddress);

    var tx = instance.transfer(_to, _value);
    tx.then(function(result) {
        console.log(_value, "IoTCoin sent to: ", _to);
        callback("TX SUCCESS");
    }).catch(function(error) {
        console.log(error);
        callback("TRANSACTION FAILED");
    });
}