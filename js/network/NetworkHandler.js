/**
 * @providesModule NetworkHandler
 * @flow
 */
import { getStore } from 'GlobalStore';

let url ='https://api.coinmarketcap.com/v1/ticker/?convert=';

export async function getCryptocurrencyData() {
    const url = buildUrl();
    console.log('!!! url', url)
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store',
            'cache-control': 'max-age=0'
        }
    });
    return await response.json();
}

function buildUrl() {
    let  currencyType = getStore().getState().coinReducer.currencyType;
    const limit = '&limit=';
    const numberOfReturnsCrypto = getStore().getState().coinReducer.numberOfCoins;
    return url += currencyType + limit + numberOfReturnsCrypto;
}