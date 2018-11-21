
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
import PortfolioScreen from 'PortfolioScreen';
import { Provider } from 'react-redux';
import { getStore } from 'GlobalStore';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    CoinListScreen: Home,
    PortfolioScreen: PortfolioScreen
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

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
        },
        tabBarOptions: {
            activeTintColor: '#03A9F4',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#FAFAFA',
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
