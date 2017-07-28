import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CoinCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start'
    },
    titleStyle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 15
    }
});
