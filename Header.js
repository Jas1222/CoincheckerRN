import React from 'react';
import { View,
    Text,
    StyleSheet,
    TextInput,
    Picker} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#03A9F4',
    },
    title: {
        height: 40,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
        }
    }

    _renderPicker() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
                    style={{height: 40, width: 100, color: '#FFF' }}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        )
    }

    _renderHeader() {
        return (
            <View style={styles.container}>
                { this._renderPicker() }
            </View>
        )
    }

    render() {
        return (
            <View>
                { this._renderHeader()}
            </View>
        );
    }
}

