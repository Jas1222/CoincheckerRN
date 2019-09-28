/**
 * @providesModule DisplayPortfolioScreenStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 125, 
        alignItems: 'center', 
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#03A9F4'
    },
    title: {
        fontSize: 30, 
        fontWeight: 'bold', 
        alignSelf: 'center',
        color: 'white'

    },
    subtitle: {
        fontSize: 22, 
        fontWeight: '300',
        color: 'white'
    },
    editButton: {
        alignSelf: 'center',
        color: 'black',
    },
    editContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        backgroundColor: '#6dd1ff',
        alignItems: 'center',
    }
});