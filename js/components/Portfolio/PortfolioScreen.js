/**
 * @providesModule PortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'PortfolioScreenStyles';
import SelectMultiple from 'react-native-select-multiple'

const newUserMessage = "Select your coins below and enter your quantity to start your portfolio";

export class PortfolioScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Porfolio'
    };

    adaptData = (coins) => {
        let data = [];

        coins.forEach((coin) => {
           data.push(coin.name);
        });

        return data.sort();
    };

    constructor(props) {
        super(props);

        const newData = this.adaptData(this.props.coinData);

        this.state = {
            coins: newData,
            selectedCoins: []
        }
    }

    onSelectionChange = (selectedCoins) => {
        this.setState({
            selectedCoins: selectedCoins
        })
    };

    hasUserSelectedCoin = (coin) => {
        console.warn('!! hasUserSelected')
        return this.state.selectedCoins.includes(coin);
    };

    onDonePressed = () => {

    };

    renderNewUserTitle = () => {
        return(
            <Text style={styles.subtitle}>{newUserMessage}</Text>
        )
    };

    renderLabel = (coin) => {
        console.log('!!! renderLabel')
        return (
            <View style={{ flex: 1}}>
                <View style={styles.row}>
                    <Text>{coin}</Text>
                    <TextInput
                        style={styles.input}
                        editable={(coin) => this.hasUserSelectedCoin(coin)}
                    />
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>
                    {"Welcome."}
                </Text>

                {this.renderNewUserTitle()}

                <SelectMultiple
                    style={styles.listContainer}
                    items={this.state.coins}
                    renderLabel={this.renderLabel}
                    selectedItems={this.state.selectedCoins}
                    onSelectionsChange={this.onSelectionChange} />

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    <TouchableOpacity
                        onPress={this.onDonePressed} style={{flexDirection: 'row', height: 50, justifyContent: 'center'}}>
                        <Text
                            style = {styles.button}>
                            {"Done"}
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.coinData
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen)
