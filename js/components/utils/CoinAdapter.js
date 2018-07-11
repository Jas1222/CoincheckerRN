/**
 * @providesModule CoinAdapter
 * @flow
 */
import { getStore } from 'GlobalStore'; 


export function adaptCoinData(data) {
    var result = data.data.map(coin => {
        let adaptedCoin = {
            name: coin.name,
            symbol: coin.symbol,
            price: coin.quotes.GBP.price,
            timePeriod: coin.quotes.GBP.volume_24h,
            percentageChange: coin.quotes.GBP.percent_change_24h
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