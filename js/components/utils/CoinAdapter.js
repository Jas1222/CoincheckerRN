/**
 * @providesModule CoinAdapter
 * @flow
 */
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