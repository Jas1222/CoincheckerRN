/**
 * @providesModule PortfolioRowStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 80, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    columnContainer: {
        margin: 10,
        flexDirection: 'column'
    },
    bold: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    thin: {
        fontWeight: '200'
    }
});
