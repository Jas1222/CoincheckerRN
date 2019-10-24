import { StyleSheet } from 'react-native';
import { appTheme } from '../../../Colors';

export const styles = StyleSheet.create({
    header: {
        height: 125,
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: appTheme.primary
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: appTheme.secondaryText
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '300',
        color: appTheme.secondaryText
    },
    editButton: {
        alignSelf: 'center',
        color: appTheme.secondaryText,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexGrow: 1, 
        borderColor: appTheme.accent
    },
    editContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderBottomWidth: 4,
        borderColor: appTheme.accent,
        backgroundColor: appTheme.secondary,
        alignItems: 'center',
    }
});
