
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
import { Provider } from 'react-redux';
import { getStore } from 'GlobalStore';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={getStore()}>
                <Home/>
            </Provider>
        );
    }
}
