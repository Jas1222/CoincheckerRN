/**
 * @providesModule CoinAdapter
 * @flow
 */
import { convertJsonTypes } from 'CoinUtil';
import { getStore } from 'GlobalStore'; 

export function adaptCoinData(data) {
    var result = data.data.map(coin => {
        let convertedCoin = convertJsonTypes(coin);

        let adaptedCoin = {
            name: coin.name,
            symbol: coin.symbol,
            timePeriod: convertedCoin.timePeriod,
            percentageChange: convertedCoin.percentageChange,
            price: convertedCoin.price
        };
        return adaptedCoin;
    });

    return result;
}

export function getSymbol() {
    const fiatCurrency = getStore().getState().coinReducer.currencyType;

    switch(fiatCurrency) {
        case 'gbp':
            return '£';
            break;
        case 'eur':
            return '€';
            break;
        case 'usd':
            return '$';
            break;
        default:
            return '£';
    }
}