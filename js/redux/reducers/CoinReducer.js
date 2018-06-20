import { DATA_AVAILABLE, CHANGE_CURRENCY_TYPE, CHANGE_NUMBER_COINS } from 'CoinActionTypes';

const initialState = {
    currencyType: 'gbp',
    numberOfCoins: 25,
};

export function coinReducer(state = initialState, action) {
    switch(action.type) {
        case DATA_AVAILABLE: {
            return {
                ...state
            }
        }
        case CHANGE_CURRENCY_TYPE: {
            return {
                currencyType: action.body
            }
        }
        case CHANGE_NUMBER_COINS: {
            return {
                ...state
            }
        }

    }
}
