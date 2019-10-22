import { StyleSheet } from 'react-native';
import { appTheme } from '../../Colors';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: appTheme.secondaryBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 4,
        padding: 9,
        borderRadius: 10,
        elevation: 1
    },
    columnContainer: {
        flexDirection: 'column'
    },
    name: {
        color: appTheme.primaryText,
        fontSize: 22,
        marginBottom: 3
    },
    price: {
        color: appTheme.primaryText,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 3
    },
    positivePercent: {
        color: appTheme.positive,
        fontSize: 15,
        fontWeight: 'bold',
    },
    negativePercent: {
        color: appTheme.negative,
        fontSize: 15,
        fontWeight: 'bold',
    },
    secondaryContainer: {
        flex: 1,
        backgroundColor: appTheme.secondaryBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    symbol: {
        fontSize: 13,
        color: appTheme.primaryText,
        justifyContent: 'flex-start',
    }
});
