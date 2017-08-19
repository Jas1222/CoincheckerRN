var url ='https://api.coinmarketcap.com/v1/ticker/?convert=';
var currencyType = 'gbp';
const limit = '&limit=';
var numberOfReturnsCrypto = 50;
url += currencyType + limit + numberOfReturnsCrypto;

export function getCryptocurrencyData (currency) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    })
}
