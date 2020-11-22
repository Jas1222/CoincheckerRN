import { getStore } from '../redux/store/GlobalStore';

export async function getCryptocurrencyData() {
    const url = buildUrl();

    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store',
            'cache-control': 'max-age=0',
            'X-CMC_PRO_API_KEY': 'c5816cac-e0ce-4860-8b64-b833a75ffa03'
        }
    });
    
    return await response.json();
}

function buildUrl() {
    const { currencyType, numberOfCoins } = getStore().getState().coinReducer

    return `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${numberOfCoins}&convert=${currencyType}`    
}