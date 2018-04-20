# IoTContracts
#### Austin Hester

This repo contains some smart contracts for IoT devices.

There is ```IoTCoin``` which is the token used for stuff.

```IoTCamera``` uses IoTCoin, and an IoT device (RPi3) calls the
```openServer()``` function.

The server should be running ```node openServer.js``` to listen for the 
events emitted by the contract.  
Upon OpenServer event, the server starts listening on the port given.  
The server then calls ```openStream()``` function, which emits another
event.

The IoT device should be running ```node openStream.js```. This script 
listens for the OpenStream event. Upon receiving this event, the RPi3 
opens the video from raspivid and pipes the stream to netcat on the 
given port and address specified in the event data.

Upon timeout or video stream end, the server calls ```closeServer()``` 
function, which makes the contract available again.


### Prerequisites

```npm install web3 ```
```npm install netcat ```
```npm install raspivid ```