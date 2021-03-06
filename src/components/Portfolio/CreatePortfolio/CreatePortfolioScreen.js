import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './CreatePortfolioScreenStyles';
import SelectMultiple from 'react-native-select-multiple'
import { setUserCoins, setUserCoinPortfolio } from '../../../redux/actions/CoinActions';
import { withNavigation } from 'react-navigation';
import { isValidInput, alertInvalidInput } from './../../Utils/ValidateInput';
// TODO extract to a labels file
const newUserMessage = "Select your coins below and enter your quantity to start your portfolio";

export class CreatePortfolioScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Portfolio',
        header: null
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

    componentDidMount() {
        // TODO set portfolio to coinsWithQuantities
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

    getPositionOfCoinInState = (coin) => {
        const listOfCoins = this.state.coins;
        const index = listOfCoins.indexOf(coin);

        return index;
    };


    // 2 methods below could be merged
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

    // Could be merged with above
    isCoinInUsersPortfolio = (coin, userPortfolio) => {
        let result = false;
        let position = 0;
        result = userPortfolio.findIndex((userCoin) => {

            return userCoin.name == coin
        });
        

        position = result;
        result = result > -1 ? true : false;

        return [result, position]
    };

    onChangeText = (name, value) => {
        if (isValidInput(value)) {
            const coinsWithQuantities = this.state.coinsWithQuantities;
            const selectedCoins = this.state.selectedCoins;
    
            let isPreviouslySelected = [false, 0];
    
            if (selectedCoins.length) {
                isPreviouslySelected = this.hasUserPreviouslySelectedCoin(name, coinsWithQuantities)
            }
            
            if (isPreviouslySelected[0]) {
                coinsWithQuantities[isPreviouslySelected[1]].quantity = value;
            } else {
                const coinToAdd = {
                    value: name,
                    quantity: value
                };    
        
                coinsWithQuantities.push(coinToAdd);
            }
    
            if (coinsWithQuantities.length) {
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
        } else {
            alertInvalidInput(() => {});
        }
    };
    
    isSubmitEnabled = () => {
        return !!this.state.coinsWithQuantities.length;
    };

    onDonePressed = async () => {
        await this.props.setUserCoinPortfolio(this.state.coinsWithQuantities, this.props.coinData);
        this.props.setUserCoins(this.state.coinsWithQuantities);
        this.props.navigation.navigate('DisplayPortfolio');
    };

    renderNewUserTitle = () => {
        return (
            <Text style={styles.subtitle}>{newUserMessage}</Text>
        )
    };

    renderLabel = (coin) => {
        // TODO Fix autofocus
        const [isCoinTicked, position] = this.hasUserPreviouslySelectedCoin(coin, this.state.selectedCoins);
        let portfolioValue;
        
        if (this.props.coinPortfolio) {
            const [existsInPortfolio, where] = this.isCoinInUsersPortfolio(coin, this.props.coinPortfolio);

            if (existsInPortfolio) {
                
                portfolioValue = this.props.coinPortfolio[where].quantity
            }

        }
        
        return (
            <View style={{ flex: 1}}>
                <View style={styles.row}>
                    <Text>{coin}</Text>

                    {isCoinTicked &&
                        <TextInput
                            style={styles.input}
                            mode={'outlined'}
                            defaultValue={portfolioValue}
                            keyboardType={'numeric'}
                            autoCapitalize="none"
                            placeholder={'0.0'}
                            editable={isCoinTicked || existsInPortfolio}
                            onChangeText={(value) => this.onChangeText(coin, value)}
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
        coinData: state.coinReducer.coinData,
        userCoins: state.coinReducer.userCoins,
        coinPortfolio: state.coinReducer.portfolioData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserCoins: (coinsWithQuantities) => {
            dispatch(setUserCoins(coinsWithQuantities));
        },
        setUserCoinPortfolio: (userCoinData, allCoins) => {
            //TODO: REMOVE? DO WE NEED THIS?
            dispatch(setUserCoinPortfolio(userCoinData, allCoins));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CreatePortfolioScreen))
