pragma solidity ^0.4.0;

import {IoTCoin} from "../../IoTCoin/contracts/IoTCoin.sol";


/// @title IoTCamera
contract IoTCamera is IoTCoin {
    /*
    * @title IoTCamera
    * @author Austin Hester
    * @notice Developed for Camera contract.
    * @dev This line is for developers only
    */

    string public name = "IoTCamera";
    bool public isAvailable = false;

    function IoTCamera() public {
        // Best practice here, or
        // anywhere changes are made to state,
        // is to follow "checks-effects-interactions" pattern,
        // as well as to follow up with an assertion that
        // the intended effect was applied.
        require(msg.sender != 0x0);                  // The Check
        require(msg.sender != 0x0);                  // The Check
        balance[msg.sender] = totalSupply;            // The Effect
        //                                            // There is no interaction here
        assert(balance[msg.sender] == totalSupply);   // Be Assertive.
    }
}