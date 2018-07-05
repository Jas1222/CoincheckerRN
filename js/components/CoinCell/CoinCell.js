/**
 * @providesModule CoinCell
 * @flow
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CoinCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            price: this.props.price,
            percentChange: this.props.percentChange,
            symbol: this.props.symbol
        }
    }

    componentWillReceiveProps() {
        this.setState({
            name: this.props.name,
            price: this.roundNumber(this.props.price),
            percentChange: this.props.percentChange,
            symbol: this.props.symbol
        });
    }

    roundNumber(price) {
        return Math.round(price * 100) / 100;
    }

    formatPercentColor() {
        const percent = String(this.state.percentChange);

        if (percent.charAt(0) == '-') {
            return styles.negativePercent;
        } else {
            return styles.positivePercent;
        }
    }

    render() {
        return (
            <View>
                <View style={styles.primaryContainer}>
                    <Text style={styles.coinName}>{this.state.name}</Text>
                    <Text style={styles.coinPrice}>{"£" + this.state.price}</Text>
                </View>

                <View style={styles.secondaryContainer}>
                    <Text style={styles.symbol}>{'(' + this.state.symbol + ')'}</Text>
                    <Text style={this.formatPercentColor()}>{this.state.percentChange + '% 24h'}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coinName: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 3
    },
    coinPrice: {
        color: '#000000',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 15
    },
    positivePercent: {
        color: '#3D9970',
        fontSize: 13,
        marginBottom: 10,
        marginRight: 15,
        fontWeight: 'bold',

    },
    negativePercent: {
        color: '#FF4136',
        fontSize: 13,
        marginBottom: 10,
        marginRight: 15,
        fontWeight: 'bold',
    },
    secondaryContainer: {
        backgroundColor: '#FFFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    symbol: {
        fontSize: 13,
        justifyContent: 'flex-start',
        marginLeft: 15,

    }
});
