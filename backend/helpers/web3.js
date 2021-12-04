const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const { contractAbi, contractAddress } = require("./keys");

var contract = new web3.eth.Contract(contractAbi, contractAddress);

module.exports = { contract, web3 };
