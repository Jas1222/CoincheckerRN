/**
 * @providesModule CoinAdapter
 * @flow
 */
import { getStore } from 'GlobalStore';

export function adaptCoinData(data) {
    return data.data.map(coin => {
        let convertedCoin = convertJsonTypes(coin);

        return {
            name: coin.name,
            symbol: coin.symbol,
            percentageChange: convertedCoin.percentageChange,
            price: convertedCoin.price
        };
    });
}

export function getFiatSymbol() {
    const fiatCurrency = getStore().getState().coinReducer.currencyType;

    switch(fiatCurrency) {
        case 'gbp':
            return '£';
        case 'eur':
            return '€';
        case 'usd':
            return '$';
        default:
            return '£';
    }
}

export function getPercentageLabel() {
    const percentTimePeriod = getStore().getState().coinReducer.timePeriod;

    switch(percentTimePeriod) {
        case 'percent_change_1h':
            return '1h';
            break;
        case 'percent_change_24h':
            return '24h';
            break;
        case 'percent_change_7d':
            return '7d';
            break;
        default:
            return '24h';
            break;
    }
}

export function convertJsonTypes(item) {
    const currencyType = getStore().getState().coinReducer.currencyType;
    const timePeriod = getStore().getState().coinReducer.timePeriod;
    const obj = item.quotes[currencyType.toUpperCase()];

    return {
        price: obj.price,
        percentageChange: obj[timePeriod]
    };
}

export function calculateUserCoinWorth(latestPrices, userPortfolio) {
    // console.warn('latestPrices', latestPrices)
    console.warn('userPortfolio', userPortfolio)
    
    userPortfolio.forEach((portfolioCoin) => {
        latestPrices.find((coinWithPrice) => {
            // return coinWithPrice.
        });
    });

}