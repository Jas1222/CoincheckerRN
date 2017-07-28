import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CoinCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.primaryContainer}>
                    <Text style={styles.coinName}>{this.props.coinName}</Text>
                    <Text style={styles.coinPrice}>{this.props.coinPrice}</Text>
                </View>

                <View style={styles.secondaryContainer}>
                    <Text style={styles.coinPercentageChange}>{this.props.coinPercentageChange}</Text>
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
        fontSize: 18,
        marginTop: 10,
        marginLeft: 15
    },
    coinPrice: {
        color: '#000000',
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 15
    },
    coinPercentageChange: {
        color: '#000000',
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
