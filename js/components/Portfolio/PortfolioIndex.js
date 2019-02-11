/**
 * @providesModule PortfolioIndex
 * @flow
 */

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import {connect} from 'react-redux';

export class PortfolioIndex extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Portfolio'
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkUserHasCoins();
    }

    checkUserHasCoins = () => {
        //TODO Check why null?
        const routeName = this.props.coinData ? 'DisplayPortfolio' : 'CreatePortfolio';
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     key: routeName,
        //     actions: [
        //         NavigationActions.navigate({routeName: routeName})
        //     ]
        // });
        //
        this.props.navigation.navigate(routeName);
    };

    render() {
        return (
            <View>
                <Text> {"SDKLFNDSLF"} </Text>
            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.userCoins,
    };
}

export default connect(mapStateToProps)(PortfolioIndex)
