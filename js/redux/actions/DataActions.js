/**
 * @providesModule DataActions
 * @flow
 */
import { CHANGE_CURRENCY_TYPE, 
    CHANGE_NUMBER_COINS, 
    GET_COIN_DATA,
    CHANGE_PERCENTAGE_TIME_PERIOD
} from 'CoinActionTypes';
import { getCryptocurrencyData } from 'NetworkHandler';
import { adaptCoinData } from 'CoinAdapter';
import { getCurrentTime } from 'TimeUtil';

export function setCurrencyType(currency) {
    return (dispatch) => {
        return dispatch({type: CHANGE_CURRENCY_TYPE, currency});
    }
}

export function setNumberOfCoins(number) {
    return (dispatch) => {
        dispatch({type: CHANGE_NUMBER_COINS, numberOfCoins: number});
    }
}

export function setPercentageChangeTimePeriod(timePeriod) {
    return (dispatch) => {
        dispatch({type: CHANGE_PERCENTAGE_TIME_PERIOD, timePeriod});
    }
}

export function getAllCoins() {
    return async (dispatch) => {
        const data = await getCryptocurrencyData();
        const adaptedData = adaptCoinData(data);
        adaptedData.lastRefreshed = getCurrentTime();

        return dispatch({type: GET_COIN_DATA, adaptedData});
    }
}