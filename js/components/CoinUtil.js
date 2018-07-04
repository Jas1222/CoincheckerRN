/**
 * @providesModule CoinUtil
 * @flow
 */

import { getStore } from 'GlobalStore';

export function getCurrencyTypeJson(item) {
    const currencyType = getStore().getState().coinReducer.currencyType;
    
    if (currencyType == 'eur') {
        return item.price_eur;
    } else if (currencyType == 'usd') {
        return item.price_usd;
    } else {
        return item.price_gbp;
    }
}