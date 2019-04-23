/**
 * @providesModule EditPortfolioItemComponent
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { styles } from 'EditPortfolioItemComponentStyles';

export default class EditPortfolioItemComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = ({
            newQuantity: null
        });
    }

    render() {
        return (
            <View
                style={styles.container}>

                <Text style={styles.headerText}>
                    {"Enter your new " + this.props.item.name + " quantity:"}
                </Text>

                <TextInput
                    onChangeText={(value) => this.props.onQuantityChanged(this.props.item.name, value)}
                    placeholder={"New quantity"}
                    style={styles.inputTextPresent}
                    keyboardType={'numeric'}
                >

                </TextInput>

                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={this.props.onSavePressed}>
                    <Text style={styles.saveButton}>
                        {"SAVE"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.orText}> 
                    {"OR"}
                </Text>
                
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={this.props.onDeletePressed}>
                    <Text style={styles.deleteButton}>
                        {"DELETE"}
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}