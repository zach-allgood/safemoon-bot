const axios = require('axios');
const tokenAbi = require('../token-abi.json');
const Web3  = require('web3');
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

module.exports = {
    name: 'walletusd',
    description: "Gets the amount of Safemoon you currently have in USD",
    execute(message, args){
        let sfmToken = new web3.eth.Contract(tokenAbi,"0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3");

        sfmToken.methods.balanceOf(args[0]).call()
        .then(function(result){
            let tokens = result * 10e-10;
            axios.get('https://api.dex.guru/v1/tokens/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3-bsc?fbclid=IwAR0qKz2sVH6T224agyAj66P9m5CyaMkiQIsViYV3dUm-e11ftjRGrhClh3c')
            .then(function (response) {
                let price = response.data.priceUSD;
                message.channel.send("$" + (Math.round((tokens * price)*100)/100).toLocaleString());
            }).catch(function (error) {
                console.log(error);
            });
        });        
    }
}