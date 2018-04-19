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
		const message = new web3.eth.Contract(IoTCameraArtifact.abi, address);

		// interact
		var cb = web3.eth.personal.getAccounts().then(function (ac) {
			return ac[0];
		}).then(function (cb) {
			console.log(cb);
//			var call = message.methods['getMessage(address)'](cb);
//			call.call().then( function(msg) {
//				console.log(msg);
//			});
		});

		//console.log(message)
		// watch for event SentMessage
		var event = message.events['OpenServer'] 
		//({fromBlock: 0, toBlock: 'latest'}, function(error,event) {
		(function(error, event) {
			console.log(error)
		})
		.on('data', function(log) {
 			var info = log.returnValues;
/*			var from = info._from;
			var to = info._to;
			var msg = info._msg;
			var blockNum = log.blockNumber */
			var port = info._port;

			console.log(port);
/* 			console.log("from: ", from);
			console.log("to: ", to);
			console.log("msg: ", msg);
			console.log("blockNumber: ", blockNum) */
			//console.log(log);
/* 			exec('nc -l 2222', function(error, stdout, stderr) {
				console.log("server open");
				if (error) {
					console.log("error");
					console.log(error.code);
					console.log(stderr);
				} else {
					console.log("no error");
					console.log(stdout);
				}
				console.log("server open");
			}); */
/* 			var writable = fs.createWriteStream('file.txt');
			var nc = new NetcatServer();
			nc.port(2222).exec('binary | cat').listen()
			.on('error', function(error) {
				console.log(error);
			}); */

			var writable = fs.createWriteStream('file.txt');
			var nc = new NetcatServer();
			nc.port(2222).k().listen().pipe(writable)
			.on('ready', function(error) {
				console.log('ready');
			})
			.on('data', function(error) {
				//console.log(error);
			})
			.on('error', function(error) {
				console.log(error);
			})
			.on('connection', function(error) {
				console.log("connected");
			})
			.on('end', function(error) {
				console.log('end');
			});
		}).on('changed', function(log) {
			console.log(log);
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
