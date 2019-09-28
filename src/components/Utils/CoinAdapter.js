import { getStore } from '../../redux/store/GlobalStore';

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

function add(a, b) {
    return a + b;
}

export async function calculateUserCoinPortfolio(userPortfolio, latestPrices) {
    if (!userPortfolio) {
        return;
    }

    let userCoinsWithTotalPrice = [];

    userPortfolio.forEach((portfolioCoin) => {
        const matchedCoin = latestPrices.find((coinWithPrice) => {
            return coinWithPrice.name == portfolioCoin.value
        });

        if (matchedCoin) {
            matchedCoin.quantity = portfolioCoin.quantity;
            matchedCoin.userSum = Math.round(matchedCoin.price * portfolioCoin.quantity * 100) / 100;
            userCoinsWithTotalPrice.push(matchedCoin)
        }
    });

    const totalPortfolioSum = Math.round(userCoinsWithTotalPrice.map((coin) => coin.userSum).reduce(add, 0) * 100) / 100

    return {
        userCoinsWithTotalPrice: userCoinsWithTotalPrice,
        totalPortfolioSum: totalPortfolioSum
    }
}