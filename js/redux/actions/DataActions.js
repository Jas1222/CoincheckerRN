/**
 * @providesModule DataActions
 * @flow
 */
import { getCryptocurrencyData } from 'NetworkHandler';
import { DATA_AVAILABLE } from 'CoinActionTypes';

export function getData() {
    return async (dispatch) => {
        const result = await getCryptocurrencyData();
        dispatch({type: DATA_AVAILABLE, result})
    }
}
