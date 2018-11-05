/**
 *  @providesModule ErrorMessage
 *
 */

import React from 'react';
import {
    View,
    Text
} from 'react-native'
import styles from 'ErrorMessageStyles';

export default class ErrorMessage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Unable to fetch data</Text>
                <Text style={styles.subtitle}>Swipe down to try again</Text>
            </View>
        )
    }
}
