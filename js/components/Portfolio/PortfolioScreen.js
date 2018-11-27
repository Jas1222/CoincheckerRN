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
        tabBarLabel: 'Portfolio'
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
        const selectedCoins = this.state.selectedCoins;
        let result = false;
        
        if (selectedCoins.length) {
            console.warn('! not null')
            result = selectedCoins.forEach((selectedCoin) => {
                if (selectedCoin.value == coin)  {
                    console.warn('TRUE')
                    t = true
                    return t;
                } else {
                    console.warn('FALSE')
                    t = false;
                    return t
                }
            });
        }

        return result;

    };

    onDonePressed = () => {

    };

    renderNewUserTitle = () => {
        return(
            <Text style={styles.subtitle}>{newUserMessage}</Text>
        )
    };

    renderLabel = (coin) => {
        return (
            <View style={{ flex: 1}}>
                <View style={styles.row}>
                    <Text>{coin}</Text>
                    <TextInput
                        style={styles.input}
                        mode={'outlined'}
                        keyboardType={'numeric'}
                        autoCapitalize="none"
                        placeholder={'0.0'}
                        editable={this.hasUserSelectedCoin(coin)}
                    />
                </View>
            </View>
        )
    };

    renderHeader = () => {
        return (
               <View style={{flexDirection: 'row'}}>
                   <Text>{"Owned"}</Text>
                   <Text>{"Name"}</Text>
                   <Text>{"Amount Held"}</Text>
               </View> 
        );
    }

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
