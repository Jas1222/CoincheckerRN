import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { styles } from './EditPortfolioItemComponentStyles';
import { setUserCoinPortfolio, setUserCoins } from '../../../../redux/actions/CoinActions';
import { connect } from 'react-redux';

export class EditPortfolioItemComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = ({
            coinToUpdate: null
        });
    }

    componentDidMount() {
        const coinToUpdate = {
            value: this.props.item.name,
            quantity: this.props.item.quantity
        }

        this.setState({
            coinToUpdate
        })
    }

    onQuantityChanged = (coinName, quantity) => {
        const coinToUpdate = {
            value: coinName,
            quantity: quantity
        }

        this.setState({
            coinToUpdate
        })
    }

    onSavePressed = () => {
        const addMessage = `Are you sure you want to add ${this.state.coinToUpdate.quantity} ${this.props.item.name}`;
        const editMessage = `About to edit ${this.state.coinToUpdate.value} quantity to ${this.state.coinToUpdate.quantity}`;
        const modeMessage = this.props.expandedOptions ? editMessage : addMessage

        if (!this.state.coinToUpdate) {
            this.displayErrorMessage();
            return;
        }

        Alert.alert(
            "Confirm",
            modeMessage,
            [
                { text: 'Cancel', onPress: () => this.props.toggleModal },
                { text: 'Ok', onPress: () => this.saveUserCoin() }
            ]
        )
    }

    onDeletePressed = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete ' + this.props.item.name,
            [
                { text: 'Cancel', onPress: () => this.props.toggleModal },
                { text: 'Ok', onPress: () => this.deleteUserCoin() }
            ]
        )
    }

    getSelectedCoinPosition(selectedCoin, list) {
        const result = list.findIndex((coin) => {
            return coin.value == selectedCoin.value
        })

        return result;
    };

    deleteUserCoin = () => {
        const userCoins = this.props.userCoins;
        const positionToUpdate = this.getSelectedCoinPosition(this.state.coinToUpdate, userCoins);

        userCoins.splice(positionToUpdate, 1);

        this.props.setUserCoinPortfolio(userCoins, this.props.coinData);
        this.props.setUserCoins(userCoins);
        this.props.toggleModal();
    };

    saveUserCoin = () => {
        const coin = this.state.coinToUpdate;
        const userCoins = this.props.userCoins;

        if (this.props.expandedOptions) {
            const positionToUpdate = this.getSelectedCoinPosition(coin, userCoins);
            userCoins[positionToUpdate].quantity = coin.quantity;
        } else {
            userCoins.push(coin)
        }


        this.props.setUserCoinPortfolio(userCoins, this.props.coinData);
        this.props.setUserCoins(userCoins);

        this.props.toggleModal();
    };

    displayErrorMessage = () => {
        Alert.alert(
            'Invalid quantity',
            'Please enter a valid quantity',
            [
                { text: 'Ok', onPress: () => { } }
            ]
        )
    }

    render() {
        return (
            <View
                style={styles.container}>

                <Text style={styles.headerText}>
                    {"Enter your new " + this.props.item.name + " quantity:"}
                </Text>

            
                <TextInput
                    onChangeText={(value) => this.onQuantityChanged(this.props.item.name, value)}
                    placeholder={"0.0"}
                    style={styles.inputTextPresent}
                    keyboardType={'numeric'}
                    style={{alignSelf: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}
                >

                </TextInput>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={this.onSavePressed}>
                        <Text style={styles.saveButton}>
                            {"SAVE"}
                        </Text>
                    </TouchableOpacity>

                    {this.props.expandedOptions &&
                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={styles.orText}>
                                {"OR"}
                            </Text>
                        </View>
                    }

                    {this.props.expandedOptions && <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        onPress={this.onDeletePressed}>
                        <Text style={styles.deleteButton}>
                            {"DELETE"}
                        </Text>
                    </TouchableOpacity>
                    }
                </View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.coinReducer.portfolioData,
        totalPrice: state.coinReducer.totalPrice,
        coinData: state.coinReducer.coinData,
        userCoins: state.coinReducer.userCoins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserCoinPortfolio: (userCoinData, allCoins) => {
            dispatch(setUserCoinPortfolio(userCoinData, allCoins));
        },
        setUserCoins: (userCoins) => {
            dispatch(setUserCoins(userCoins));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolioItemComponent)
