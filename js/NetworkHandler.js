var url ='https://api.coinmarketcap.com/v1/ticker/?convert=';
var currencyType = 'gbp';
const limit = '&limit=';
var numberOfReturnsCrypto = 30;
url += currencyType + limit + numberOfReturnsCrypto;

export function getCryptocurrencyData() {
    return new Promise(function (resolve) {
        fetch(url, {
            headers: {
                'Cache-Control': 'no-cache, no-store',
                'cache-control': 'max-age=0'
            }
        })
            .then((response) => resolve(response.json()))
            .catch((error) => {
                console.error(error);
            });
    })
}