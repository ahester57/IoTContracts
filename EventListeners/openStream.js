const fs = require('fs');
const NetcatClient = require('netcat/client');
var Web3 = require('web3');
const IoTCameraArtifact = require('./IoTCamera.json');

const netId = '2323';
const provider = 'ws://localhost:7676';

if (typeof web3 !== 'undefined')
	var web3 = new Web3(web3.currentProvider);
else
	var web3 = new Web3(new Web3.providers.WebsocketProvider(provider));

web3.eth.net.getId()
.then(function(netId) {
	const address = IoTCameraArtifact.networks[netId].address;
	const camera = new web3.eth.Contract(IoTCameraArtifact.abi, address);

	//console.log(camera);
	
	var streamEvent = camera.events['OpenStream']
	(function(error, event) {
		console.log(error);
	})
	.on('data', function(log) {
		console.log("The Server is open!");
	})
	.on('changed', function(log) {
		//
	})
	.on('error', function(log) {
		console.log(log);
	});

}).catch(function(error) {
	console.log(error);
});
