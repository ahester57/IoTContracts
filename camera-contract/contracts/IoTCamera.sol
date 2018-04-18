pragma solidity ^0.4.0;

//import {IoTCoin} from "../../IoTCoin/contracts/IoTCoin.sol";


/// @title IoTCamera
contract IoTCamera {//is IoTCoin {
    /*
    * @title IoTCamera
    * @author Austin Hester
    * @notice Developed for Camera contract.
    * @dev This line is for developers only
    */

    string public name = "IoTCamera";
    bool public isAvailable = false;

    // Event which Edge server is watching
    event OpenServer(address indexed _from, address indexed _to,
                        uint8 _port);

    // Event which IoT device (pi) is watching after sending a request
    event OpenStream(address indexed _from, address indexed _to,
                        string _ip);

    function IoTCamera() public {
        // Best practice here, or
        // anywhere changes are made to state,
        // is to follow "checks-effects-interactions" pattern,
        // as well as to follow up with an assertion that
        // the intended effect was applied.
        require(msg.sender != 0x0);                  // The Check
        //balance[msg.sender] = totalSupply;            // The Effect
        isAvailable = true;
        assert(isAvailable);   // Be Assertive.
    }

    function isAvailable() public view returns (bool) {
        return isAvailable;
    }

    function closeStream() public {
        require(!isAvailable);
        isAvailable = true;
        assert(isAvailable);   // Be Assertive.
    }
}