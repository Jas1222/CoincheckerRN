 import { StyleSheet } from 'react-native';
 import { appTheme } from './../../../Colors';

 export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: appTheme.secondaryText,
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
        borderColor: appTheme.primary,
        color: appTheme.primary,
        padding: 5
    }
 });
 
 