 /**
  * @providesModule CoinCellStyles
  */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 9
    },
    columnContainer: {
        flexDirection: 'column'
    },
    name: {
        color: '#000000',
        fontSize: 22,
        marginBottom: 3
    },
    price: {
        color: '#000000',
        // marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 3
    },
    positivePercent: {
        color: '#3D9970',
        fontSize: 15,
        fontWeight: 'bold',
    },
    negativePercent: {
        color: '#FF4136',
        fontSize: 15,
        fontWeight: 'bold',
    },
    secondaryContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    symbol: {
        fontSize: 13,
        justifyContent: 'flex-start',
    }
});
