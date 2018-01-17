var url ='https://api.coinmarketcap.com/v1/ticker/?convert=';
const currencyType = 'gbp';
const limit = '&limit=';
const numberOfReturnsCrypto = 25;
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
