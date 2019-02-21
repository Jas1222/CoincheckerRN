/**
 * @providesModule EditPortfolioItemComponent
 * @flow
 */

import React from 'react';
import {
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
                style={styles.container}
            >
                <Text styles={styles.headerText}>
                    {"Enter your new " + this.props.name + " quantity:"}
                </Text>

                <TextInput
                    onChangeText={}
                >

                </TextInput>

                <TouchableOpacity
                    onPress={() => this.props.onQuantityPressed(this.state.newQuantity)}

                >
                    <Text>
                        {"SAVE"}
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}