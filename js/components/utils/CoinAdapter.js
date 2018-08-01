/**
 * @providesModule CoinAdapter
 * @flow
 */
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

export function getFiatSymbol() {
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

export function convertJsonTypes(item) {
    const currencyType = getStore().getState().coinReducer.currencyType;

    let adaptedCoin = {};

    switch(currencyType) {
        case('gbp'):
            adaptedCoin.price = item.quotes.GBP.price;
            adaptedCoin.timePeriod = item.quotes.GBP.volume_24h;
            adaptedCoin.percentageChange = item.quotes.GBP.percent_change_24h;
            break;
        case('usd'):
            adaptedCoin.price = item.quotes.USD.price;
            adaptedCoin.timePeriod = item.quotes.USD.volume_24h;
            adaptedCoin.percentageChange = item.quotes.USD.percent_change_24h;
            break;
        case('eur'):
            adaptedCoin.price = item.quotes.EUR.price;
            adaptedCoin.timePeriod = item.quotes.EUR.volume_24h;
            adaptedCoin.percentageChange = item.quotes.EUR.percent_change_24h;
            break;
        default:
            adaptedCoin.price = item.quotes.GBP.price;
            adaptedCoin.timePeriod = item.quotes.GBP.volume_24h;
            adaptedCoin.percentageChange = item.quotes.GBP.percent_change_24h;
    }

    return adaptedCoin;
}