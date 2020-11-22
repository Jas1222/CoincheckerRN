import { getStore } from '../../redux/store/GlobalStore';

export function adaptCoinData(data) {
    return data.map(coin => {
        let convertedCoin = convertJsonTypes(coin);

        return {
            name: coin.slug.toUpperCase(),
            symbol: coin.symbol,
            percentageChange: Math.round(convertedCoin.percentageChange * 100) / 100,
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
    console.warn({item})
    console.warn({currencyType})
    console.warn({timePeriod})
    const obj = item.quote[currencyType.toUpperCase()];

    return {
        price: obj.price,
        percentageChange: obj[timePeriod]
    };
}

function add(a, b) {
    return a + b;
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    const formattedSum = formatNumber(totalPortfolioSum);

    return {
        userCoinsWithTotalPrice: userCoinsWithTotalPrice,
        totalPortfolioSum: formattedSum
    }
}