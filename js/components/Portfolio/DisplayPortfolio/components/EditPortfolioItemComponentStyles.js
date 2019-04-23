/**
 * @providesModule EditPortfolioItemComponentStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderWidth: 8,
        borderColor: '#03A9F4',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f7faff',
        alignSelf: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#03A9F4',
        flexWrap: 'wrap',
        fontSize: 16,
    },
    inputTextPresent: {
        color: '#03A9F4',
        width: '100%',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20
    },
    saveButton: {
        textAlign: 'center',
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#03A9F4',
        color: '#03A9F4',
        marginTop: 10
    },
    orText: {
        color: 'grey',
        marginTop: 20,
        marginBottom: 20,
    },
    deleteButton: {
        textAlign: 'center',
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        color: 'red'
    }
});