/**
 * @providesModule SearchBar
 * @flow
 */
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';

const styles = {
    primaryContainer: {
        height: 75
    }
}

export default class AddCoinCell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        }
    }

    onValueChange = (keyword) => {
        this.setState({ keyword })
        this.props.onSearchWordEntered(keyword)
    }

    render() {
        return (
            <View style={styles.primaryContainer}>
                <TextInput
                    onChangeText={keyword => this.onValueChange(keyword)}
                    value={this.state.keyword}
                    placeholder={"Search coin here"}
                />
            </View>
        );
    }
}   