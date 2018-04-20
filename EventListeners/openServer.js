const exec = require('child_process').exec
const fs = require('fs');
const NetcatServer = require('netcat/server');
const NetcatClient = require('netcat/client');
var Web3 = require('web3')
const IoTCameraArtifact = require('./IoTCamera.json')

const networkId = '2323'
const provider = 'ws://localhost:35353'

if (typeof web3 !== 'undefined')
	var web3 = new Web3(web3.currentProvider);
else 
	var web3 = new Web3(new Web3.providers.WebsocketProvider(provider));


web3.eth.net.getId().then(function(networdId) {
		// get the contract instance
		const address = IoTCameraArtifact.networks[networkId].address;
		const camera = new web3.eth.Contract(IoTCameraArtifact.abi, address);

		// interact
		var cb = web3.eth.personal.getAccounts().then(function (ac) {
			return ac[0];
		}).then(function (cb) {
			console.log(cb);
		});

		// watch for event OpenServer
		console.log(camera);
		var event = camera.events['OpenServer'] 
		//({fromBlock: 0, toBlock: 'latest'}, function(error,event) {
		(function(error, event) {
			console.log(error)
		})
		.on('data', function(log) {
 			var info = log.returnValues;
			var port = info._port;
			var deviceAddr = info._from;
			var serverAddr = info._to;
			var blockNum = log.blockNumber;

			console.log("device: ", deviceAddr);
			console.log("port: ", port);
			console.log("blockNumber: ", blockNum);

			var readyTimer;
			var activityTimer;

			var writable = fs.createWriteStream('file.txt');
			var nc = new NetcatServer();
			nc.port(2222).wait(3000).k().listen().pipe(process.stdout)
			.on('ready', function(error) {
				console.log('ready');
				camera.methods.openStream(deviceAddr, "192.168.1.101").send({from: "0xb6c832cc0a7e368b79fba5de8fcd7edfa7367afb"})
				
				readyTimer = setTimeout(function(arg) { nc.close(); }, 9000, 'ready');
			})
			.on('data', function(error) {
				//console.log("data received");
			})
			.on('error', function(error) {
				console.log(error);
				// close stream
				//nc.close();
			})
			.on('connection', function(error) {
				console.log("connected");
				clearTimeout(readyTimer);
				activityTimer = setTimeout(function(arg) {nc.close(); }, 9000, 'active');
			})
			.on('end', function(error) {
				console.log('client disconnected');
				// close stream
			})
			.on('waitTimeout', function(error) {
				console.log('client timeout');
				// close stream
				nc.close();
			})
			.on('close', function(error) {
				console.log('close');
				// close stream
				camera.methods.closeServer().send({from: "0xb6c832cc0a7e368b79fba5de8fcd7edfa7367afb"})
				.then(function(result) {
					console.log("Connection closed.");
					console.log("\nWaiting for event...");
				});
			});
		}).on('changed', function(log) {
			//console.log(log);
		}).on('error', function(log) {
			console.log(log);
		})

}).catch(function(err) {
	console.log(err);
});
