import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#03A9F4',
    },
    title: {
        height: 20,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

const Header = (props) => (
    <View style={styles.container}>
        <Text style={styles.title}>{"Coin-checker"}</Text>
    </View>
);

export default Header;
