
const fs = require('fs');
const NetcatServer = require('netcat/server');
const NetcatClient = require('netcat/client');

var writable = fs.createWriteStream('file.txt');
var nc = new NetcatServer();
nc.port(2222).k().listen().pipe(writable)
.on('ready', function(error) {
    console.log('ready');
})
.on('data', function(error) {
    console.log(error);
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
console.log('fuck');
