const fs = require('fs');
const NetcatClient = require('netcat/client');
const raspivid = require('raspivid');
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
	var video = raspivid({
		width:960,
		height:800,
		timeout:0
	});
	var ncClient = new NetcatClient();
	
	var streamEvent = camera.events['OpenStream']
	(function(error, event) {
		console.log(error);
	})
	.on('data', function(log) {
		console.log("The Server is open!");

		video.pipe(ncClient.addr('192.168.1.101')
			.port(2222).connect().stream());
	})
	.on('changed', function(log) {
		//
	})
	.on('close', function(log) {
		//
	})
	.on('error', function(log) {
		console.log(log);
	});

}).catch(function(error) {
	console.log(error);
});

