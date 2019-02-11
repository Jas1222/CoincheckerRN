/**
 * @providesModule CoinActions
 * @flow
 */
import { CHANGE_CURRENCY_TYPE, 
    CHANGE_NUMBER_COINS, 
    GET_COIN_DATA,
    CHANGE_PERCENTAGE_TIME_PERIOD,
    USER_COINS,
    SET_PORTFOLIO_VALUE
} from 'CoinActionTypes';
import { getCryptocurrencyData } from 'NetworkHandler';
import { adaptCoinData, calculateUserCoinPortfolio } from 'CoinAdapter';
import { getCurrentTime } from 'TimeUtil';
import { AsyncStorage } from 'react-native';

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

export function setUserCoins(userCoins) {
    return async (dispatch) => {
        try {
            const stringifiedData = JSON.stringify(userCoins)
            await AsyncStorage.setItem('USER_COIN_DATA', stringifiedData)
        } catch (err) {
            console.warn('Messed up saving coin values')
        }

        return dispatch({type: USER_COINS, userCoins})
    }
}

export function setUserCoinPortfolio(userCoinData, allCoins) {
    return async (dispatch) => {
        const portfolioData = await calculateUserCoinPortfolio(userCoinData, allCoins);
        
        return dispatch({type: SET_PORTFOLIO_VALUE, portfolioData});
    }
}

export function getAllCoins() {
    return async (dispatch) => {
        let data = {};

        try {
            const rawData = await getCryptocurrencyData();
            data.adaptedData = adaptCoinData(rawData);
            data.lastRefreshed = getCurrentTime();
        } catch (error) {
            data.failedRequest = true;
        }

        return dispatch({type: GET_COIN_DATA, data});
    }
}

export function getUserCoins() {
    return async (dispatch) => {
        const stringifiedData = await AsyncStorage.getItem('USER_COIN_DATA');
        
        const userCoins = JSON.parse(stringifiedData);

        return dispatch({type: USER_COINS, userCoins})
    }
}