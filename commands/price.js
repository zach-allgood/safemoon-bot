const axios = require('axios');

module.exports = {
    name: 'price',
    description: "Gets the current price of the Safemoon Token.",
    execute(message, args){
        axios.get('https://api.dex.guru/v1/tokens/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3-bsc?fbclid=IwAR0qKz2sVH6T224agyAj66P9m5CyaMkiQIsViYV3dUm-e11ftjRGrhClh3c')
            .then(function (response) {
                message.channel.send((Math.round(response.data.priceUSD * 10000000000*100)/100).toLocaleString());
            }).catch(function (error) {
                console.log(error);
            });
    }
}