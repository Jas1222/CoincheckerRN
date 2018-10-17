/**
 * @providesModule HeaderStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    titleContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#03A9F4',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#ffffff',
        alignSelf: 'center'
    },
    dropdown: {
        color: '#ffffff',
        width: '40%',
        marginLeft: 20,
    },
    icon: {
        marginTop: 15,
        marginLeft: 20
    },
    rowFormat: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    settingsIcon: {
        alignSelf: 'flex-end'
    },
    settingsLabels: {
        color: '#FFFFFF',
        fontSize: 15,
        marginLeft: 25,
        marginTop: 15,
        flex: 1
    },
    lastUpdatedContainer: {
        marginTop: 10,
        padding: 3,
        flexDirection: 'column'
    },
    lastUpdatedLabel: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },
    lastUpdatedTime: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'white'
    }
});