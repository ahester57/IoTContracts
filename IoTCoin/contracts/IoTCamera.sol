pragma solidity ^0.4.0;

import {IoTCoin} from "./IoTCoin.sol";


/// @title IoTCamera
contract IoTCamera {//is IoTCoin {
    /*
    * @title IoTCamera
    * @author Austin Hester
    * @notice Developed for Camera contract.
    * @dev This line is for developers only
    */

    string public name = "IoTCamera";
    address public coinAddress;
    bool public isAvailable = false;

    // Event which Edge server is watching
    event OpenServer(address indexed _from, address indexed _to,
                        uint8 _port);

    // Event which IoT device (pi) is watching after sending a request
    event OpenStream(address indexed _from, address indexed _to,
                        string _ip);

    function IoTCamera(address iotCoin) public {
        // Best practice here, or
        // anywhere changes are made to state,
        // is to follow "checks-effects-interactions" pattern,
        // as well as to follow up with an assertion that
        // the intended effect was applied.
        require(msg.sender != 0x0);                  // The Check
        //balance[msg.sender] = totalSupply;            // The Effect
        isAvailable = true;
        coinAddress = iotCoin;
        assert(isAvailable);   // Be Assertive.
        //assert(coinAddress == iotCoin);   // Be Assertive.
    }

    function isAvailable() public view returns (bool) {
        return isAvailable;
    }

    function openServer(
        address _to,
        uint8 _port
    ) public {
        require(getServerAddress() > 0x0);
        require(isAvailable);
        isAvailable = false;
        emit OpenServer(msg.sender, _to, _port);
        assert(!isAvailable);
    } 

    function openStream(
        address _to,
        string _ip 
    ) public {
        require(getServerAddress() > 0x0);
        emit OpenStream(msg.sender, _to, _ip);
    } 

    function closeStream() public {
        require(!isAvailable);
        isAvailable = true;
        assert(isAvailable);   // Be Assertive.
    }

    function getServerAddress() public view returns (address) {
        IoTCoin ic = IoTCoin(coinAddress);
        //uint256 bal = ic.getBalance(msg.sender);
        address edge = ic.getEdgeServer();
        //ic.transfer(ic.getEdgeServer(), 10);
        return edge;
    }

    function getCoinAddress() public view returns (address) {
        return coinAddress;
    }

}