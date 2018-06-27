/**
 * @providesModule NetworkHandler
 * @flow
 */
import { getStore } from 'GlobalStore';

export async function getCryptocurrencyData() {
    const url = buildUrl();
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store',
            'cache-control': 'max-age=0'
        }
    });
    return await response.json();
}

function buildUrl() {
    let url ='https://api.coinmarketcap.com/v1/ticker/?convert=';
    let  currencyType = getStore().getState().coinReducer.currencyType;
    const limit = '&limit=';
    const numberOfReturnsCrypto = getStore().getState().coinReducer.numberOfCoins;

    return url += currencyType + limit + numberOfReturnsCrypto;
}