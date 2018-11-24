/**
 * @providesModule PortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';

export class PortfolioScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Porfolio'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text> {"PORTFOLIO "}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen)
