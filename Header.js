/**
 * @providesModule Header
 * @flow
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Picker
} from 'react-native';

const styles = StyleSheet.create({
    titleContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#03A9F4',
    },
    title: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    hourPicker: {
        color: '#ffffff',
        width: '40%',
        marginLeft: 50
    },
    pickerOptions: {
        fontWeight: 'bold',
    }
});

const headerOffset = 150;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
            height: 60,
            expanded: false,
            timeFormat: 'percent_change_24h',
            currency: 'GBP',
            numberOfCoins: 20
        }
    }

    _renderTitle() {
        const coinText = <Text style={[styles.title,]}>COIN-CHECK</Text>;
        const settingsTest = <Text style={[styles.title, {textDecorationLine: 'underline'}]}>SETTINGS</Text>;

        let titleText = this.state.expanded ? settingsTest : coinText;

        return (
            <View style={[styles.titleContainer]}>
                {titleText}
            </View>
        )
    }

    _onPress() {
        LayoutAnimation.easeInEaseOut();

        if (this.state.expanded) {
            this.setState({
                height: this.state.height - headerOffset,
                expanded: false
            })
        } else {
            this.setState({
                height: this.state.height + 150,
                expanded: true
            })
        }

        this.setState({
            expanded: !this.state.expanded
        });
    }

    _renderSettingsContainer() {
        if (this.state.expanded) {
            return <View>
                <Picker
                    style={ styles.hourPicker }
                    selectedValue={ this.state.timeFormat }
                    mode={"dropdown"}
                    onValueChange={(itemValue, itemIndex) => this.setState({timeFormat: itemValue})}>
                    <Picker.Item label="1 Hour" value="percent_change_1h"/>
                    <Picker.Item label="24 Hour" value="percent_change_24h"/>
                    <Picker.Item label="7 day" value="percent_change_7d"/>
                </Picker>

                <Picker
                    style={ styles.hourPicker }
                    selectedValue={ this.state.currency }
                    mode={"dropdown"}
                    onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                    <Picker.Item label="GBP" value="price_gbp"/>
                    <Picker.Item label="EUR" value="price_eur"/>
                    <Picker.Item label="USD" value="price_usd"/>
                </Picker>

                <Picker
                    style={ styles.hourPicker }
                    selectedValue={ this.state.numberOfCoins }
                    mode={"dropdown"}
                    onValueChange={(itemValue, itemIndex) => this.setState({numberOfCoins: itemValue})}>
                    <Picker.Item label="10" value="10"/>
                    <Picker.Item label="20" value="20"/>
                    <Picker.Item label="30" value="30"/>
                </Picker>


            </View>
        }
    }

    _renderHeader() {
        return (
            <TouchableOpacity onPress={this._onPress.bind(this)}>
                <View style={[{height: this.state.height}, {backgroundColor: '#03A9F4'}]}>
                    { this._renderTitle() }
                    { this._renderSettingsContainer() }
                </View>
            </TouchableOpacity>
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

