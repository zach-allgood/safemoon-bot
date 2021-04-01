const tokenAbi = require('../token-abi.json');
const Web3  = require('web3');
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

module.exports = {
    name: 'wallet',
    description: "Gets the amount of tokens you currently have",
    execute(message, args){
        let sfmToken = new web3.eth.Contract(tokenAbi,"0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3");

        sfmToken.methods.balanceOf(args[0]).call()
        .then(function(result){
            message.channel.send((result * 10e-10).toLocaleString());
        });        
    }
}