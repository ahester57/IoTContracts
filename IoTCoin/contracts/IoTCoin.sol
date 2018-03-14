pragma solidity ^0.4.0;


/// @title IoTCoin, Essential Control
contract IoTCoin {
    /*
    * @title IoTCoin, Essential Control
    * @author Austin Hester
    * @notice Developed for Camera contract.
    * @dev This line is for developers only
    * 
    */

    string public name = "IoTCoin";
    string public symbol = "ITCN";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping (address => uint256) public balance;

    // An event that occurs when a transfer happens
    event Transfer(address _to, uint256 _value);

    function IoTCoin(
        uint256 initialSupply
    ) public {
        // Best practice here, or
        // anywhere changes are made to state,
        // is to follow "checks-effects-interactions" pattern,
        // as well as to follow up with an assertion that
        // the intended effect was applied.
        require(initialSupply >= 0);                  // The Check
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balance[msg.sender] = totalSupply;            // The Effect
        //                                            // There is no interaction here
        assert(balance[msg.sender] == totalSupply);   // Be Assertive.
    }

    /// Retrieve the IoTCoin balance of an address
    /// @param _of address 
    /// @return return _balance
    function getBalance(
        address _of
    ) public view returns (uint256 _balance) {
        // This is a 'view' function, which means
        // it only reads from the network.
        // We are not making any changes so no need to
        // require or assert because there are no changes being
        // made that may need to be reverted.
        return balance[_of];
    }

    /**
     * Transfer tokens
     *
     * Send _value IoTCoin to _to from your account
     *
     * @param _to Address of recipient
     * @param _value the amount of IoTCoin
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    /// Transfer IoTCoin to _to of amount _value
    // These triple comments provide info about the function following
    /// @dev Only devs will see this
    /// @param _to address
    /// @param _value uint256 
    /// @return does not return a value
    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) private {
        require(_to != 0x0);
        require(balance[_from] > _value);
        // check for overflow in _to's account
        require(balance[_to] + _value >= balance[_to]);
        uint256 previousBalances = balance[_to] + balance[_from];
        // effects
        balance[_from] -= _value;
        balance[_to] += _value;
        // interaction
        Transfer(_to, _value);
        // assertion
        assert(balance[_to] + balance[_from] == previousBalances);
    }

    
}