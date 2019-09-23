/**
 * @providesModule AddCoinCell
 * @flow
 */
import React from 'react';
import { styles } from 'AddCoinCellStyles';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class AddCoinCell extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handlePress = () => {
        this.props.onPress(this.props.item);
    }

    render() {
        return (
            <View style={styles.primaryContainer}>
                <View style={styles.secondaryContainer}>
                    <View style={styles.columnContainer}>
                        <Text style={styles.primaryText}>{this.props.item.name}</Text>
                        <Text style={styles.secondaryText}> {`(${this.props.item.symbol})`}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.handlePress}>
                            <Text style={styles.addButton}>{"ADD"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}   
