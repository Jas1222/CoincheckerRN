/**
 * @providesModule PortfolioIndex
 * @flow
 */

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import {connect} from 'react-redux';

export class PortfolioIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkUserHasCoins();
    }

    checkUserHasCoins = () => {
        console.log('!!', this.props.coinData);
        const routeName = this.props.coinData !== null ? 'DisplayPortfolioScreen' : 'CreatePortfolioScreen';
        console.warn(routeName)

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

// function mapDispatchToProps(dispatch) {
//     return {
//
//     };
// }

export default connect(mapStateToProps)(PortfolioIndex)
