import { StyleSheet } from 'react-native';
import { appTheme } from '../../../../Colors'

export const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderWidth: 8,
        borderColor: appTheme.primary,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f7faff',
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerText: {
        color: appTheme.primary,
        flexWrap: 'wrap',
        fontSize: 16,
    },
    inputTextPresent: {
        color: appTheme.primary,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20
    },
    saveButton: {
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: appTheme.primary,
        color: appTheme.primary,
        marginTop: 10,
        padding: 10
    },
    orText: {
        color: 'grey',
    },
    deleteButton: {
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        color: 'red'
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    }
});