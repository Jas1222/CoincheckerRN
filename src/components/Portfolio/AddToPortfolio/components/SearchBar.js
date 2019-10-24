import React from 'react';
import {
    TextInput,
    View,
} from 'react-native';
import { appTheme } from './../../../../Colors';

const styles = {
    primaryContainer: {
        height: 50,
        backgroundColor: appTheme.secondary,
        justifyContent: 'center'
    },
    text: {
        color: appTheme.secondaryText,
        fontSize: 15,
        alignSelf: 'center',
    },
    placeholder: {
        color: appTheme.secondaryText,
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
                    placeholderTextColor={styles.placeholder.color}
                    style={styles.text}
                />
            </View>
        );
    }
}   