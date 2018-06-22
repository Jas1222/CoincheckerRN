/**
 * @providesModule DataActions
 * @flow
 */
import { getCryptocurrencyData } from 'NetworkHandler';
import { COIN_LIST_DATA } from 'CoinActionTypes';

export function getData() {
    return async (dispatch) => {
        const result = await getCryptocurrencyData();
        dispatch({type: COIN_LIST_DATA, result})
    }
}
