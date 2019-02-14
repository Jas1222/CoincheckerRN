/**
 * @providesModule PortfolioRowStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export const getStyles = (editMode) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row', 
        },
        subcontainer: {
            height: 80,          
            flexDirection: 'row', 
            backgroundColor: 'white',
            borderRadius: 10,
            marginBottom: 8,
            width: editMode ? '85%' : '100%' ,
            justifyContent: 'space-between',
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
} 