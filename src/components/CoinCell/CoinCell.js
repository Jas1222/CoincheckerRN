import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { getFiatSymbol, getPercentageLabel } from '../Utils/CoinAdapter';
import { styles } from './CoinCellStyles';

export default class CoinCell extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    _roundNumber(price) {
        return Math.round(price * 100) / 100;
    }

    _formatPercentColor() {
        const percent = String(this.props.percentageChange);

        if (percent.charAt(0) === '-') {
            return styles.negativePercent;
        } else {
            return styles.positivePercent;
        }
    }

    _getPrice() {
         return getFiatSymbol() + this._roundNumber(this.props.price);
    }

    render() {
        return (
            <View style={styles.primaryContainer}>
                    <View style={ styles.columnContainer }>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.symbol}>{'(' + this.props.symbol + ')'}</Text>
                    </View>

                    <View style={ styles.columnContainer, {alignItems: 'flex-end'} }>
                        <Text style={styles.price}>{this._getPrice()}</Text>
                        <Text style={this._formatPercentColor()}>{this.props.percentageChange}% | {getPercentageLabel()}</Text>
                    </View>
            </View>
        );
    }
}