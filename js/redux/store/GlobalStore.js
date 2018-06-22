import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import rootReducer from 'RootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
    const createAppStore = compose(applyMiddleware(thunk))(createStore);
}


