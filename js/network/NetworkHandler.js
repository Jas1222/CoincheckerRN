/**
 * @providesModule NetworkHandler
 * @flow
 */
import { getStore } from 'GlobalStore';

const LIMIT_PARAM = '&limit=';
const CONVERT_PARAM = '?convert=';
const STRUCTURE_PARAM = '&structure=array';

export async function getCryptocurrencyData() {
    const url = buildUrl();
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store',
            'cache-control': 'max-age=0'
        }
    });
    return response.json();
}

function buildUrl() {
    let url ='https://api.coinmarketcap.com/v2/ticker/';
    let currencyType = getStore().getState().coinReducer.currencyType;
    let numberOfReturnsCrypto = getStore().getState().coinReducer.numberOfCoins;

    return url += CONVERT_PARAM + currencyType + LIMIT_PARAM + numberOfReturnsCrypto + STRUCTURE_PARAM;
}