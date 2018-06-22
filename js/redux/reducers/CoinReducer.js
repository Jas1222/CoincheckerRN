/**
 * @providesModule CoinReducer
 * @flow
 */

import { COIN_LIST_DATA, CHANGE_CURRENCY_TYPE, CHANGE_NUMBER_COINS } from 'CoinActionTypes';

const initialState = {
    currencyType: 'gbp',
    numberOfCoins: 25,
};

export function coinReducer(state = initialState, action) {
    switch(action.type) {
        case COIN_LIST_DATA: {
            return {
                ...state,
                coinData: action.result
            }
        }
        case CHANGE_CURRENCY_TYPE: {
            return {
                ...state,
            }
        }
        case CHANGE_NUMBER_COINS: {
            return {
                ...state,
            }
        }
        default:
            return state

    }
}
