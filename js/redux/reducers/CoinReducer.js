/**
 * @providesModule CoinReducer
 * @flow
 */

import { CHANGE_CURRENCY_TYPE, CHANGE_NUMBER_COINS, GET_COIN_DATA } from 'CoinActionTypes';

const initialState = {
    currencyType: 'gbp',
    numberOfCoins: 25,
    coinData: []
};

export function coinReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_CURRENCY_TYPE: {
            return {
                ...state,
                currencyType: action.currency
            }
        }
        case CHANGE_NUMBER_COINS: {
            return {
                ...state,
                numberOfCoins: action.numberOfCoins
            }
        }
        case GET_COIN_DATA: {
            return {
                ...state,
                coinData: action.adaptedData
            }
        }
        default:
            return state
    }
}
