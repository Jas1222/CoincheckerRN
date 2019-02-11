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
import Icon from 'react-native-vector-icons/Feather';
import CreatePortfolioScreen from 'CreatePortfolioScreen';
import DisplayPortfolioScreen from 'DisplayPortfolioScreen';
import PortfolioIndex from 'PortfolioIndex';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

const PortfolioNavigator = createStackNavigator({
    PortfolioIndex: PortfolioIndex,
    CreatePortfolio: CreatePortfolioScreen,
    DisplayPortfolio: DisplayPortfolioScreen
});

const TabNavigator = createBottomTabNavigator({
    CoinList: Home,
    Portfolio: PortfolioNavigator
},{
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'CoinList') {
                iconName = `list`;
            } else if (routeName === 'Portfolio') {
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