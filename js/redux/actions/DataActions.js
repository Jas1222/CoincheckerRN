/**
 * @providesModule DataActions
 * @flow
 */
import { CHANGE_CURRENCY_TYPE, CHANGE_NUMBER_COINS } from 'CoinActionTypes';

export function setCurrencyType(currency) {
    console.log('!inside', currency)
    return async (dispatch) => {
        return dispatch({type: CHANGE_CURRENCY_TYPE, currency});  
    }
}

export function setNumberOfCoins(number) {
    return async (dispatch) => {
        dispatch({type: CHANGE_NUMBER_COINS, numberOfCoins: number});
    }
}
