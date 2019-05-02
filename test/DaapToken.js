const DappToken = artifacts.require("DappToken");

contract('DaapToken', (accounts) => {
    let tokenInstance;
    it('initializes the contract with the correct values', () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance;
            return instance.name();
        }).then((name) => {
            assert.equal(name, 'DappToken', 'has the correct name');
            return tokenInstance.symbol();
        }).then((symbol) => {
            assert.equal(symbol, 'DAPP', 'has the correct symbol');
            return tokenInstance.version();
        }).then((version) => {
            assert.equal(version, '1.0', 'has the correct standard');
        });
    });
    it('allocates the initial supply on deployment', () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance;
            return instance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1.000.000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance) => {
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account');
        })
    });
    it('transfer token ownership', () => {
        return DappToken.deployed().then((instance) => {
            tokenInstance = instance;
            return instance.transfer.call(accounts[0], 10000000);
        }).then(assert.fail).catch((e) => {
            assert(e.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then((receipt) => {


            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), 250000, 'added the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), 750000, 'removed the amount from the sender account');
        });
    });
});