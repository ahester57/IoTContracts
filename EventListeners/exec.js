const exec = require('child_process').exec
const fs = require('fs');
const NetcatServer = require('netcat/server');
const NetcatClient = require('netcat/client');
var Web3 = require('web3')
const IoTCameraArtifact = require('./IoTCamera.json')

const networkId = '2323'
const provider = 'ws://localhost:35353'

/* if (typeof web3 !== 'undefined')
	var web3 = new Web3(web3.currentProvider);
else */
	var web3 = new Web3(new Web3.providers.WebsocketProvider(provider));


web3.eth.net.getId().then(function(networdId) {
		// get the contract instance
		const address = IoTCameraArtifact.networks[networkId].address;
		//var message = loadChainMessage();
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

			console.log(port);
/* 			console.log("from: ", from);
			console.log("blockNumber: ", blockNum) */
/* 			exec('nc -l 2222', function(error, stdout, stderr) {
				console.log("server open");
				if (error) {
					console.log(error);
				} else {
					console.log(stdout);
				}
			}); */

			var writable = fs.createWriteStream('file.txt');
			var nc = new NetcatServer();
			nc.port(2222).wait(5).listen().pipe(writable)
			.on('ready', function(error) {
				console.log('ready');
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
				camera.methods.closeStream().send({from: "0xb6c832cc0a7e368b79fba5de8fcd7edfa7367afb"})
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


//console.log(SentMessageEvent.watch())
//console.log(message.events)

// execute a child process
exec('ls', function(error, stdout, stderr) {
	if (error) {
		console.log(error.code);
	} else {
		console.log(stdout);
	}
});
