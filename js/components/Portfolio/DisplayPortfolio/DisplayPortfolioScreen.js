/**
 * @providesModule DisplayPortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'DisplayPortfolioScreenStyles';
import { getFiatSymbol } from 'CoinAdapter';
import { setUserCoinPortfolio, setUserCoins } from 'CoinActions';
import PortfolioRow from 'PortfolioRow';
import EditPortfolioItemComponent from 'EditPortfolioItemComponent';
import Modal from 'react-native-modal';

export class DisplayPortfolioScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fiatSymbol: getFiatSymbol(),
            editMode: false,
            itemToEdit: null,
            coinToUpdate: null,
            showModal: false
        };
    }

    onRowEditPressed = (itemToEdit) => {
        this.setState({
            itemToEdit,
            editMode: true,
            showModal: true
        });
    };

    onDeletePressed = () => {
        Alert.alert( 
            'Confirm Delete',
            'Are you sure you want to delete ' + this.state.itemToEdit.name,
            [
                {text: 'Cancel', onPress: () => this.setState({showModal: false, editMode: false})},
                {text: 'Ok', onPress: () => this.deleteUserCoin()}
            ]
        )
    };

    onSavePressed = () => {
        if (!this.state.coinToUpdate) {
            this.displayErrorMessage();
            return;
        }

        Alert.alert( 
            'Confirm Edit',
            'Are you sure you want to edit ' + this.state.itemToEdit.name,
            [
                { text: 'Cancel', onPress: () => this.setState({showModal: false, editMode: false}) },
                { text: 'Ok', onPress: () => this.saveUserCoin() }
            ]
        )
    }

    onQuantityChanged = (coinName, quantity) => {
        const coinToUpdate = {
            name: coinName,
            quantity: quantity
        }

        this.setState({
            coinToUpdate
        })
    };

    getSelectedCoinPosition(selectedCoin, list) {
        const result = list.findIndex((coin) => {
            return coin.value = selectedCoin.name
        })

        return result;
    };

    deleteUserCoin = () => {
        const coin = this.state.itemToEdit;
        const userCoins = this.props.userCoins;
        const positionToUpdate = this.getSelectedCoinPosition(coin, userCoins);

        userCoins.splice(positionToUpdate, 1);

        this.props.setUserCoins(userCoins);
        this.setState({ showModal: false })
    };

    saveUserCoin = () => {
        const coin = this.state.coinToUpdate;
        const userCoins = this.props.userCoins;
        const positionToUpdate = this.getSelectedCoinPosition(coin, userCoins);

        userCoins[positionToUpdate].quantity = coin.quantity;

        this.props.setUserCoinPortfolio(userCoins, this.props.coinData);
        this.props.setUserCoins(userCoins);

        this.setState({ showModal: false })
    };

    toggleEditMode = () => {
        const toggleEdit = !this.state.editMode;

        this.setState({
            editMode: toggleEdit
        })
    };

    displayErrorMessage = () => {
        Alert.alert( 
            'Invalid quantity',
            'Please enter a valid quantity',
            [
                {text: 'Ok', onPress: () => {}}
            ]
        )  
    }

    renderEditBar() {
        return (
            <View style={ styles.editContainer }>
                <View style={{ flexGrow: 1 }}>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddCoinToPortfolio')}} >
                            <Text style={styles.editButton}>{"Add new asset"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexGrow: 1}}>
                    <TouchableOpacity onPress={this.toggleEditMode} >
                            <Text style={styles.editButton}>{"Edit existing asset"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderRow = (item) => {
        return (
            <PortfolioRow
                item={item.item}
                fiatSymbol={this.state.fiatSymbol}
                editMode={this.state.editMode}
                onRowEditPressed={this.onRowEditPressed}
                onSavePressed={this.updateUserCoins}
            />
        )
    };

    renderPortfolioPrice() {
        return (
            <View style={styles.header}>
                <Text style={styles.subtitle}> {'Your portfolio is worth:'}</Text>
                <Text style={styles.title}> {this.state.fiatSymbol}{this.props.totalPrice}</Text>
            </View>
        )
    };

    renderCoinEditor() {
        if (!this.state.showModal) {
            return null;
        }

        return (
            <View>
                <Modal
                    isVisible={this.state.showModal && this.state.editMode}
                    animationIn={'pulse'}
                    onBackdropPress={() => { this.setState({ showModal: false, editMode: false }) }}
                >
                    <EditPortfolioItemComponent
                        item={this.state.itemToEdit}
                        onQuantityChanged={this.onQuantityChanged}
                        onSavePressed={this.onSavePressed}
                        onDeletePressed={this.onDeletePressed}
                        showModal={this.state.showModal}
                    />
                </Modal>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.renderCoinEditor()}
                {this.renderPortfolioPrice()}
                {this.renderEditBar()}
                <View style={{ margin: 8 }}>
                    <FlatList
                        data={this.props.data}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                        extraData={this.state}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
