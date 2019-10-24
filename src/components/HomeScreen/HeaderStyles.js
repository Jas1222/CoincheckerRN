import { StyleSheet } from 'react-native';
import { appTheme } from '../../Colors';

export default styles = StyleSheet.create({
    titleContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: appTheme.primary,
        justifyContent: 'space-between'
    },
    subcontainer: {
        backgroundColor: appTheme.secondary
    },
    title: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        color: appTheme.text,
        alignSelf: 'center'
    },
    dropdown: {
        color: appTheme.text,
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
        color: appTheme.text,
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
        color: appTheme.text,
        fontSize: 12,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },
    lastUpdatedTime: {
        fontSize: 12,
        alignSelf: 'center',
        color: appTheme.text
    }
});