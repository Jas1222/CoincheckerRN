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

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    titleContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#03A9F4',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#ffffff',
        alignSelf: 'center'
    },
    hourPicker: {
        color: '#ffffff',
        width: '40%',
        marginLeft: 20,
    },
    pickerOptions: {
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 15,
        marginLeft: 20
    },
    rowFormat: {
        flexDirection: 'row'
    },
    settingsIcon: {
        alignSelf: 'flex-end'
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
                <View></View>
                {titleText}
                <Icon name="settings" size={30} color="#FFFFFF" style={ styles.settingsIcon } onPress={this._onSettingsPress.bind(this)}/>
            </View>
        )
    }

    _onSettingsPress() {
        LayoutAnimation.easeInEaseOut();

        if (this.state.expanded) {
            this.setState({
                height: this.state.height - headerOffset,
                expanded: false
            })
        } else {
            this.setState({
                height: this.state.height + headerOffset,
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

                <View style={ styles.rowFormat }>
                    <Icon name="clock" size={20} color="#FFFFFF" style={styles.icon}/>
                    <Picker
                        style={ styles.hourPicker }
                        selectedValue={ this.state.timeFormat }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this._updateFilterValues(itemValue)}>
                        <Picker.Item label="1 Hour" value="percent_change_1h"/>
                        <Picker.Item label="24 Hour" value="percent_change_24h"/>
                        <Picker.Item label="7 day" value="percent_change_7d"/>
                    </Picker>
                </View>

                <View style={ styles.rowFormat }>
                    <MaterialIcon name="currency-gbp" size={20} color="#FFFFFF" style={styles.icon}/>
                    <Picker
                        style={ styles.hourPicker }
                        selectedValue={ this.state.currency }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this._updateFilterValues(itemValue)}>
                        <Picker.Item label="GBP" value="gbp"/>
                        <Picker.Item label="EUR" value="eur"/>
                        <Picker.Item label="USD" value="usd"/>
                    </Picker>
                </View>

                <View style={ styles.rowFormat }>
                    <Icon name="hash" size={20} color="#FFFFFF" style={styles.icon}/>
                    <Picker
                        style={ styles.hourPicker }
                        selectedValue={ this.state.numberOfCoins }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this.setState({numberOfCoins: itemValue})}>
                        <Picker.Item label="10" value="10"/>
                        <Picker.Item label="20" value="20"/>
                        <Picker.Item label="30" value="30"/>
                        <Picker.Item label="40" value="40"/>
                        <Picker.Item label="50" value="50"/>
                    </Picker>
                </View>

            </View>
        }
    }

    _renderHeader() {
        return (
                <View style={[{height: this.state.height}, {backgroundColor: '#03A9F4'}]}>
                    { this._renderTitle() }
                    { this._renderSettingsContainer() }
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

