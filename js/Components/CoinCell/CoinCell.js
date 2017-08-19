import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CoinCell extends React.Component {
    constructor(props) {
        super(props);

        let roundedNumber = Math.round(this.props.coinPrice * 100) / 100

        this.state = {
            coinName: this.props.coinName,
            coinPrice: roundedNumber,
            coinPercentageChange: this.props.coinPercentageChange
        }
    }

    render() {
        return (
            <View>
                <View style={styles.primaryContainer}>
                    <Text style={styles.coinName}>{this.state.coinName}</Text>
                    <Text style={styles.coinPrice}>{"£" + this.state.coinPrice}</Text>
                </View>

                <View style={styles.secondaryContainer}>
                    <Text style={styles.coinPercentageChange}>{this.state.coinPercentageChange + '% 24hr'}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coinName: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 10,
        marginLeft: 15
    },
    coinPrice: {
        color: '#000000',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 15
    },
    coinPercentageChange: {
        color: '#A9A9A9',
        fontSize: 12,
        marginBottom: 10,
        marginRight: 15,
        fontStyle: 'italic'

    },
    secondaryContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },


});
