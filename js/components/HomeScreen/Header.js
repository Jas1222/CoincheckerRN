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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setCurrencyType, setNumberOfCoins } from 'DataActions';

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
    dropdown: {
        color: '#ffffff',
        width: '40%',
        marginLeft: 20,
    },
    icon: {
        marginTop: 15,
        marginLeft: 20
    },
    rowFormat: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    settingsIcon: {
        alignSelf: 'flex-end'
    },
    settingsLabels: {
        color: '#FFFFFF',
        fontSize: 15,
        marginLeft: 25,
        marginTop: 15,
        flex: 1
    }
});

const headerOffset = 150;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
            height: 60,
            expanded: false,
            timeFormat: 'percent_change_24h',
            currency: props.currencyType,
            numberOfCoins: props.numberOfCoins
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
                <Icon name="settings" size={30} color="#FFFFFF" style={ styles.settingsIcon }
                      onPress={this._onSettingsPress.bind(this)}/>
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
                    <Text style={styles.settingsLabels}> Time Period </Text>
                    <Picker
                        style={ styles.dropdown }
                        selectedValue={ this.state.timeFormat }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this.setState({timeFormat: itemValue})}>
                        <Picker.Item label="1 Hour" value="percent_change_1h"/>
                        <Picker.Item label="24 Hour" value="percent_change_24h"/>
                        <Picker.Item label="7 day" value="percent_change_7d"/>
                    </Picker>
                </View>

                <View style={ styles.rowFormat }>
                    <MaterialIcon name="currency-gbp" size={20} color="#FFFFFF" style={styles.icon}/>
                    <Text style={styles.settingsLabels}> Currency </Text>
                    <Picker
                        style={ styles.dropdown }
                        selectedValue={ this.state.currency }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this.props.setCurrencyType(itemValue)}>
                        <Picker.Item label="GBP" value="gbp"/>
                        <Picker.Item label="EUR" value="eur"/>
                        <Picker.Item label="USD" value="usd"/>
                    </Picker>
                </View>

                <View style={ styles.rowFormat }>
                    <Icon name="hash" size={20} color="#FFFFFF" style={styles.icon}/>
                    <Text style={styles.settingsLabels}> Number of Coins</Text>
                    <Picker
                        style={ styles.dropdown }
                        selectedValue={ this.state.numberOfCoins }
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this.props.setNumberOfCoins(itemValue)}>
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

function mapStateToProps(state) {
    return {
        currency: state.coinReducer.currencyType,
        numberOfCoins: state.coinReducer.numberOfCoins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrencyType: (currency) => {
            dispatch(setCurrencyType(currency));
        },
        setNumberOfCoins: (value) => {
            dispatch(setNumberOfCoins(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)