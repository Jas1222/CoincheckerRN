/**
 * @providesModule Header
 * @flow
 */
import React from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    UIManager,
    Picker
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setCurrencyType, setNumberOfCoins, getAllCoins, setPercentageChange } from 'DataActions';
import styles from 'HeaderStyles';
import { Dropdown } from 'react-native-material-dropdown';

const headerOffset = 150;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
            height: 60,
            expanded: false,
            timeFormat: props.timePeriod,
            currency: props.currencyType,
            numberOfCoins: props.numberOfCoins,

        }
    }

    _renderTitle() {
        const coinText = <Text style={[styles.title,]}>COIN-CHECK</Text>;
        const settingsTest = <Text style={[styles.title, {textDecorationLine: 'underline'}]}>SETTINGS</Text>;

        let titleText = this.state.expanded ? settingsTest : coinText;

        return (
            <View style={[styles.titleContainer]}>
                <View/>
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
        const timeData = [{value: "1 Hour"}, {value: "24 Hour"}, {value: "7 Day"}];
        const currencyData = [{value: "GBP"}, {value: "EUR"}, {value: "USD"}];
        const numberOfCoins = [{value: "10"}, {value: "20"}, {value: "30"}, {value: "40"}, {value: "50"}];

        if (this.state.expanded) {

            return <View>
                <View >
                    <Dropdown
                        data={timeData}
                        value={ this.state.timePeriod }
                        onChangeText={(value) => {
                            this.props.setPercentageChange(value);
                            this.props.refresh();
                        }}
                    />

                    <Dropdown
                        data={currencyData}
                        value={ this.state.currency }
                        onChangeText={(value) => {
                            this.props.setCurrencyType(value);
                            this.props.refresh();
                        }}
                    />

                    <Dropdown
                        data={numberOfCoins}
                        value={ this.state.numberOfCoins }
                        onChangeText={(value) => {
                            this.props.setNumberOfCoins(value);
                            this.props.refresh();
                        }}
                    />
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
        currencyType: state.coinReducer.currencyType,
        numberOfCoins: state.coinReducer.numberOfCoins,
        timePeriod: state.coinReducer.timePeriod
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrencyType: (currency) => {
            dispatch(setCurrencyType(currency));
        },
        setNumberOfCoins: (value) => {
            dispatch(setNumberOfCoins(value));
        },
        setPercentageChange: (value) => {
            dispatch(setPercentageChange(value));
        },
        getAllCoins: () => {
            dispatch(getAllCoins());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
