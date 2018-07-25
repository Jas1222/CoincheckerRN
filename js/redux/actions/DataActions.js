/**
 * @providesModule DataActions
 * @flow
 */
import { CHANGE_CURRENCY_TYPE, CHANGE_NUMBER_COINS, GET_COIN_DATA } from 'CoinActionTypes';
import { getCryptocurrencyData } from 'NetworkHandler';

export function setCurrencyType(currency) {
    return async (dispatch) => {
        return dispatch({type: CHANGE_CURRENCY_TYPE, currency});
    }
}

export function setNumberOfCoins(number) {
    return async (dispatch) => {
        dispatch({type: CHANGE_NUMBER_COINS, numberOfCoins: number});
    }
}

export function getAllCoins() {
    return async (dispatch) => {
        const data = await getCryptocurrencyData();
        const adaptedData = adaptCoinData(data);

        return dispatch({type: GET_COIN_DATA, adaptedData});
    }
}