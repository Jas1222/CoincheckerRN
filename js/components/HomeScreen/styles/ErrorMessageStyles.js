/**
 * @providesModule ErrorMessageStyles
 * @flow
 */

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: 'black'
    },
    subtitle: {
        fontSize: 14,
        color: 'grey',
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 20
    }
})