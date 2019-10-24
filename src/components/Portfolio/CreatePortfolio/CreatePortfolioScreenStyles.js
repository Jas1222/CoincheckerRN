import { StyleSheet } from 'react-native';
import { appTheme } from './../../../Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: "200",
        marginTop: '20%',
        color: appTheme.primary
    },
    subtitle: {
        textAlign: 'center',
        marginTop: '2%',
        marginLeft: '10%',
        marginRight: '10%',
        fontSize: 16
    },
    listContainer: {
        height: '60%',
        width: '90%',
        marginTop: '5%',
        marginBottom: '3%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50
    },
    row: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: '#FAFAFA',
        width: '25%',
        fontSize: 12
    },
    buttonContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    button: {
        backgroundColor: appTheme.primary,
        color: appTheme.secondaryText,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: '1%',
        height: 50,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
    }
});
