const DappToken = artifacts.require("DappToken");

contract('DaapToken', function(accounts) {

    it('sets the total supply on deployment', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return instance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1.000.000');
        });
    });

});