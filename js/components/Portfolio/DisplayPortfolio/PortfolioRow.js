/**
+ * @providesModule PortfolioRow
 * @flow
 */

import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { styles } from 'PortfolioRowStyles';

export class PortfolioRow extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> {this.props.item.name} </Text>
                <Text> {this.props.item.symbol} </Text>
                <Text> {this.props.item.quantity} </Text>
                <Text> {this.props.item.fiatSymbol}{this.props.item.userSum} </Text>
            </View>
        );
    }
}
