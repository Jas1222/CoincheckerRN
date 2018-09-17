/**
 * @providesModule DataActions
 */
import { CHANGE_CURRENCY_TYPE, 
    CHANGE_NUMBER_COINS, 
    GET_COIN_DATA,
    CHANGE_PERCENTAGE_TIME_PERIOD } from 'CoinActionTypes';
import { getCryptocurrencyData } from 'NetworkHandler';
import { adaptCoinData, getPercentageJson } from 'CoinAdapter';

export function setCurrencyType(currencyLabel) {
    return async (dispatch) => {
        const currency = currencyLabel.toLocaleLowerCase();

        dispatch({type: CHANGE_CURRENCY_TYPE, currency });
    }
}

export function setNumberOfCoins(number) {
    return async (dispatch) => {
        dispatch({type: CHANGE_NUMBER_COINS, numberOfCoins: number});
    }
}

export function setPercentageChange(timePeriodLabel) {
    return async (dispatch) => {
    const timePeriod = getPercentageJson(timePeriodLabel);

        dispatch({type: CHANGE_PERCENTAGE_TIME_PERIOD, timePeriod});
    }
}

export function getAllCoins() {
    return async (dispatch) => {
        const data = await getCryptocurrencyData();
        const adaptedData = adaptCoinData(data);
        
        dispatch({type: GET_COIN_DATA, adaptedData});
    }
}