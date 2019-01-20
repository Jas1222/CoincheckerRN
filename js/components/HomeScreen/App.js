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
import CreatePortfolioScreen from '../Portfolio/CreatePortfolio/CreatePortfolioScreen';
import DisplayPortfolioScreen from '../Portfolio/DisplayPortfolio/DisplayPortfolioScreen';
import { Provider } from 'react-redux';
import { getStore } from 'GlobalStore';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

const PortfolioNavigator = createStackNavigator({
    CreatePortfolio: CreatePortfolioScreen,
    DisplayPortfolio: DisplayPortfolioScreen
})

const TabNavigator = createBottomTabNavigator({
    CoinListScreen: Home,
    PortfolioScreen: PortfolioNavigator
},{
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'CoinListScreen') {
                iconName = `list`;
            } else if (routeName === 'PortfolioScreen') {
                iconName = `briefcase`;
            }

            return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
        },
        tabBarOptions: {
            activeTintColor: '#03A9F4',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#FAFAFA',
            inactiveBackgroundColor: '#FAFAFA',
            style: {
                borderWidth: 0.8,
                borderColor: '#93969b'
            }
        }
    })
});

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={getStore()}>
                <TabNavigator/>
            </Provider>
        );
    }
}