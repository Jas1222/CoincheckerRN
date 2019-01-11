/**
+ * @providesModule PortfolioScreen
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

// TODO extract to a labels file
const newUserMessage = "Select your coins below and enter your quantity to start your portfolio";

export class PortfolioScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Portfolio'
    };

    constructor(props) {
        super(props);

        const newData = this.adaptData(this.props.coinData);

        this.state = {
            coins: newData,
            selectedCoins: [],
            coinsWithQuantities: []
        }
    }

    // shouldnt be here but roll with its
    adaptData = (coins) => {
        let data = [];

        coins.forEach((coin) => {
           data.push(coin.name);
        });

        return data.sort();
    };

    onSelectionChange = (selectedCoins) => {
        //TODO if user deselects coin, remove from list
        this.setState({
            selectedCoins: selectedCoins
        })
    };

    hasUserPreviouslySelectedCoin = (coin, selectedCoins) => {
        // return to this function
        let result = false;
        let position = 0;
        
        if (selectedCoins) {
            result = selectedCoins.findIndex((selectedCoin) => {            
                return selectedCoin.value == coin;
            });
    
            position = result;
            result = result > -1 ? true : false;
        }

        return [result, position];
    };

    onChangeText = (value, index) => {
        const coinsWithQuantities = this.state.coinsWithQuantities;
        const selectedCoins = this.state.selectedCoins;

        let result = [false, 0];

        if (selectedCoins.length) {
            result = this.hasUserPreviouslySelectedCoin(selectedCoins[index].value, coinsWithQuantities)
        }
        
        if (result[0]) {
            coinsWithQuantities[result[1]].quantity = value;
        } else {
            const coinToAdd = {
                value: this.state.coins[index],
                quantity: value
            };    
    
            coinsWithQuantities.push(coinToAdd);
        }

        this.setState({
            coinsWithQuantities: coinsWithQuantities
        });
    };
      
    onDonePressed = () => {
        console.warn('!!!! hey', this.state.coinsWithQuantities)
    };

    renderNewUserTitle = () => {
        return(
            <Text style={styles.subtitle}>{newUserMessage}</Text>
        )
    };

    renderLabel = (coin) => {
        // TODO Fix autofocus
        let [isCoinTicked, index] = this.hasUserPreviouslySelectedCoin(coin, this.state.selectedCoins);
        
        return (
            <View style={{ flex: 1}}>
                <View style={styles.row}>
                    <Text>{coin}</Text>

                    {isCoinTicked &&
                        <TextInput
                            style={styles.input}
                            mode={'outlined'}
                            keyboardType={'numeric'}
                            autoCapitalize="none"
                            placeholder={'0.0'}
                            editable={isCoinTicked}
                            onChangeText={(value) => this.onChangeText(value, index)}
                        />}
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
