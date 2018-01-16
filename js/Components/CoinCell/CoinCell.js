import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CoinCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            price: this.roundNumber(this.props.price),
            percentChange: this.props.percentChange
        }
    }

    componentWillReceiveProps() {
        this.setState({
            name: this.props.name,
            price: this.roundNumber(this.props.price),
            percentChange: this.props.percentChange
        });
    }

    roundNumber(price) {
        return Math.round(price * 100) / 100;
    }

    render() {
        return (
            <View>
                <View style={styles.primaryContainer}>
                    <Text style={styles.coinName}>{this.state.name}</Text>
                    <Text style={styles.coinPrice}>{"£" + this.state.price}</Text>
                </View>

                <View style={styles.secondaryContainer}>
                    <Text style={styles.coinPercentageChange}>{this.state.percentChange + '% 24h'}</Text>
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
