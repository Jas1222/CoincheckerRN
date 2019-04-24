/**
 * @providesModule AddCoinCell
 * @flow
 */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = {
    primaryContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
        padding: 9,
        flexDirection: 'column'
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnContainer: {
        flexDirection: 'column'
    },
    primaryText: {
        color: '#000000',
        fontSize: 16,
        marginBottom: 3
    },
    secondaryText: {
        fontSize: 13,
        justifyContent: 'flex-start',
    },
    addButton: {
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#03A9F4',
        color: '#03A9F4',
        padding: 5
    },
    dropdownContainer: {
        height: 40,
        backgroundColor: 'red'
    },

}

export default class AddCoinCell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false
        }
    }

    render() {
        return (
            <View style={styles.primaryContainer}>
                <View style={styles.secondaryContainer}>
                    <View style={styles.columnContainer}>
                        <Text style={styles.primaryText}>{this.props.item.name}</Text>
                        <Text style={styles.secondaryText}> {`(${this.props.item.symbol})`}</Text>

                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { this.setState({ enabled: true }) }}>
                            <Text style={styles.addButton}>{"ADD"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.dropdownContainer}>

                </View>
            </View>
        );
    }
}   