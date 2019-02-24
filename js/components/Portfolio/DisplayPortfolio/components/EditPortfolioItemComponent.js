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
                    style={{ color: 'white' }}
                    keyboardType={'numeric'}
                >

                </TextInput>

                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => this.props.onSavePressed()}>
                    <Text style={styles.button}>
                        {"SAVE"}
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}