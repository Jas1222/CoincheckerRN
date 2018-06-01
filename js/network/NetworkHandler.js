/**
 * @providesModule NetworkHandler
 * @flow
 */

var url ='https://api.coinmarketcap.com/v1/ticker/?convert=';
const currencyType = 'gbp';
const limit = '&limit=';
const numberOfReturnsCrypto = 25;
url += currencyType + limit + numberOfReturnsCrypto;

export async function getCryptocurrencyData() {
    console.log('!!!!!getCryptocurrencyData');
    return fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store',
            'cache-control': 'max-age=0'
        }})
    }
