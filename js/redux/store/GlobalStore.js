/**
 * @providesModule GlobalStore
 * @flow
 */

import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'RootReducer';
import thunk from 'redux-thunk';

let store = null;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export function getStore() {
    if (!store) {
        store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
    } 
    return store;
}