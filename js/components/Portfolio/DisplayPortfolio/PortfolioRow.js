/**
 * @providesModule PortfolioRow
 * @flow
 */

import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { styles } from 'PortfolioRowStyles';

export default class PortfolioRow extends React.Component {

    constructor(props) {
        super(props);
        console.warn(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.columnContainer]}>
                    <Text style={styles.bold}> {this.props.item.symbol} </Text>
                    <Text style={styles.name}> {this.props.item.name} </Text>
                </View>

                <View style={[styles.columnContainer, { alignItems: 'center' }]}>
                    <Text style={styles.bold}> {this.props.fiatSymbol}{this.props.item.userSum} </Text>
                    <Text style={styles.thin}> {this.props.item.quantity} </Text>
                </View>
            </View>
        );
    }
}
