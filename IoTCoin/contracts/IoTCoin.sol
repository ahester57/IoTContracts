pragma solidity ^0.4.0;


contract IoTCoin {
    mapping (address => uint256) public balance;

    function IoTCoin(
        uint256 initialSupply
    ) public {
        balance[msg.sender] = initialSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public {
        require(balance[msg.sender] > _value);
        // check for overflow in _to's account
        require(balance[_to] + _value >= balance[_to]);
        uint256 _toOldBalance = balance[_to];
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        assert(balance[_to] == _toOldBalance + _value);
    }

    function getBalance(
        address _of
    ) public view returns (uint256 _balance) {
        return balance[_of];
    }
}