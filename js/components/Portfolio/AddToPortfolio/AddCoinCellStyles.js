 /**
  * @providesModule AddCoinCellStyles
  */

 import { StyleSheet } from 'react-native';

 export const styles = StyleSheet.create({
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
    }
 });
 
 