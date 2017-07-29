export function getCryptocurrencyData () {
    return new Promise(function (resolve, reject) {
        fetch('https://api.coinmarketcap.com/v1/ticker/?convert=gbp&limit=8')
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    })
}
