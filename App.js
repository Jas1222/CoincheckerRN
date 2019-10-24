import React from 'react';
import  Home from './src/components/HomeScreen/Home';
import { Provider } from 'react-redux';
import { getStore } from './src/redux/store/GlobalStore';
import Icon from 'react-native-vector-icons/Feather';
import CreatePortfolioScreen from './src/components/Portfolio/CreatePortfolio/CreatePortfolioScreen';
import DisplayPortfolioScreen from './src/components/Portfolio/DisplayPortfolio/DisplayPortfolioScreen';
import PortfolioIndex from './src/components/Portfolio/PortfolioIndex';
import AddToPortfolioScreen from './src/components/Portfolio/AddToPortfolio/AddToPortfolioScreen';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { appTheme } from './src/Colors';

const PortfolioNavigator = createStackNavigator({
    PortfolioIndex: PortfolioIndex,
    CreatePortfolio: CreatePortfolioScreen,
    DisplayPortfolio: DisplayPortfolioScreen,
    AddCoinToPortfolio: AddToPortfolioScreen
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
            activeTintColor: appTheme.accent,
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
    render() {
        return (
            <Provider store={getStore()}>
                <TabNavigator/>
            </Provider>
        );
    }
}