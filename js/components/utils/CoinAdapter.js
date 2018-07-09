/**
 * @providesModule CoinAdapter
 * @flow
 */

import { convertJsonTypes } from 'CoinUtil';

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