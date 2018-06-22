
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import  Home from 'Home';
import { getCryptocurrencyData } from 'NetworkHandler'
import { getData } from 'DataActions';
import { Provider } from 'react-redux';
import store from 'GlobalStore';


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}
