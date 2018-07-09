/**
 * @providesModule CoinUtil
 * @flow
 */

import { getStore } from 'GlobalStore';

export function convertJsonTypes(item) {
    const currencyType = getStore().getState().coinReducer.currencyType;

    let adaptedCoin = {};

    // TODO switch statement
    if (currencyType == 'eur') {
        adaptedCoin.price = item.quotes.EUR.price;
        adaptedCoin.timePeriod = item.quotes.EUR.volume_24h;
        adaptedCoin.percentageChange = item.quotes.EUR.percent_change_24h;
    } else if (currencyType == 'usd') {
        adaptedCoin.price = item.quotes.USD.price;
        adaptedCoin.timePeriod = item.quotes.USD.volume_24h;
        adaptedCoin.percentageChange = item.quotes.USD.percent_change_24h;

    } else {
        adaptedCoin.price = item.quotes.GBP.price;
        adaptedCoin.timePeriod = item.quotes.GBP.volume_24h;
        adaptedCoin.percentageChange = item.quotes.GBP.percent_change_24h;
    }

    return adaptedCoin;
}