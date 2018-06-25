/**
 * @providesModule GlobalStore
 * @flow
 */

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'RootReducer';
import thunk from 'redux-thunk';

let store = null;

export function getStore() {
    if (!store) {
        store = createStore(rootReducer, applyMiddleware(thunk));
    } 
    return store;
}