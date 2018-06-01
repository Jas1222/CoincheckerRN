/**
 * @providesModule DataActions
 * @flow
 */
import { getCryptocurrencyData } from 'NetworkHandler';

export const DATA_AVAILABLE = 'DATA_AVAILABLE';

export function getData() {
    return (dispatch) => {
        const data =
        dispatch({type: DATA_AVAILABLE, data})
    }
}