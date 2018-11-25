/**
 * @providesModule CoinReducer
 * @flow
 */

import { CHANGE_CURRENCY_TYPE, 
    CHANGE_NUMBER_COINS, 
    GET_COIN_DATA, 
    CHANGE_PERCENTAGE_TIME_PERIOD
} from 'CoinActionTypes';

const initialState = {
    currencyType: 'gbp',
    numberOfCoins: 200,
    timePeriod: 'percent_change_24h',
    coinData: [],
    lastRefreshed: '',
    failedRequest: false
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
                coinData: action.data.adaptedData,
                lastRefreshed: action.data.lastRefreshed,
                failedRequest: action.data.failedRequest
            }
        }
        case CHANGE_PERCENTAGE_TIME_PERIOD: {
            return {
                ...state,
                timePeriod: action.timePeriod
            }
        }
        default:
            return state
    }
}
