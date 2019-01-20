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
import { setUserCoins } from 'DataActions';

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
            coinsWithQuantities: [],
            buttonDisabled: true
        }
    }

    // TODO shouldnt be here but roll with its
    adaptData = (coins) => {
        let data = [];

        coins.forEach((coin) => {
           data.push(coin.name);
        });

        return data.sort();
    };

    // TODO shouldnt be here but roll with its
    findWithAttr = (array, attr, value) => {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    onSelectionChange = (modifiedSelectedCoins) => {
        const coinsWithQuantities = this.state.coinsWithQuantities;
        
        coinsWithQuantities.forEach((selectedCoin, index) => {
            const result = this.findWithAttr(modifiedSelectedCoins, 'value', selectedCoin.value);

            if (result < 0) {
                coinsWithQuantities.splice(index, 1)
            }
        })

        this.setState({
            selectedCoins: modifiedSelectedCoins,
            coinsWithQuantities: coinsWithQuantities
        })
    };

    hasUserPreviouslySelectedCoin = (coin, coinsWithQuantities) => {
        let result = false;
        let position = 0;
        
        if (coinsWithQuantities) {
            result = coinsWithQuantities.findIndex((selectedCoin) => {            
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

        let isPreviouslySelected = [false, 0];

        if (selectedCoins.length) {
            isPreviouslySelected = this.hasUserPreviouslySelectedCoin(selectedCoins[index].value, coinsWithQuantities)
        }
        
        if (isPreviouslySelected[0]) {
            coinsWithQuantities[isPreviouslySelected[1]].quantity = value;
        } else {
            const coinToAdd = {
                value: this.state.coins[index],
                quantity: value
            };    
    
            coinsWithQuantities.push(coinToAdd);
        }

        if (coinsWithQuantities) {
            this.setState({
                buttonDisabled: false
            })
        } else {
            this.setState({
                buttonDisabled: true
            })        
        }

        this.setState({
            coinsWithQuantities: coinsWithQuantities
        });
    };
    
    isSubmitEnabled = () => {
        if (this.state.coinsWithQuantities.length) {
            return true;
        }  else {
            return false;
        }
    }

    onDonePressed = () => {
        console.warn('onDonePressed', this.state.coinsWithQuantities)
        this.props.setUserCoins(this.state.coinsWithQuantities)
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

                <View style={styles.buttonContainer}> 
                    <TouchableOpacity
                        onPress={this.onDonePressed} 
                        style={[{flexDirection: 'row', height: 50, justifyContent: 'center'}, this.state.buttonDisabled ? {opacity: 0.5} : {}]}
                        disabled={this.state.buttonDisabled}
                        >
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
        setUserCoins: (coinsWithQuantities) => {
            dispatch(setUserCoins(coinsWithQuantities));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen)
