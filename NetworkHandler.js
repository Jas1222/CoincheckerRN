
export function getCryptocurrencyData() {
    return fetch('https://api.coinmarketcap.com/v1/ticker/?convert=gbp&limit=10')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson
        })
        .catch((error) => {
            console.error(error);
        });
}
