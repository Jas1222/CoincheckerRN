/**
 * @providesModule Header
 * @flow
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#03A9F4',
    },
    title: {
        height: 30,
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
        }
    }

    _renderPicker() {
        return (
            <View>
                <Text
                style={styles.title}>COIN-CHECK</Text>
            </View>
        )
    }

    _renderHeader() {
        return (
            <View style={styles.container}>
                { this._renderPicker() }
            </View>
        )
    }

    render() {
        return (
            <View>
                { this._renderHeader()}
            </View>
        );
    }
}

