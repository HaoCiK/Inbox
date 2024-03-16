require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const mneumonic = process.env.mneumonic;
const testnet_api = process.env.testnet_api;

const provider = new HDWalletProvider(
    mneumonic,
    testnet_api
);
const web3 = new Web3(provider);
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
// the main reason we put it in deploy is because we want make our life easier with async
const deploy = async () => {
    accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Welcome to Web3!'] })
        .send({ from: accounts[0], gas: 1000000 })

    console.log('Contract deployed to', result.options.address);
};
deploy();
