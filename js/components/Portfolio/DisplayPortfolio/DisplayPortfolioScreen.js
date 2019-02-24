/**
 * @providesModule DisplayPortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'DisplayPortfolioScreenStyles';
import { getFiatSymbol } from 'CoinAdapter';
import { setUserCoinPortfolio, setUserCoins } from 'CoinActions';
import PortfolioRow from 'PortfolioRow';
import AddCoinComponent from 'AddCoinComponent';
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

    componentDidMount() {
        this.props.setUserCoinPortfolio(this.props.userCoins, this.props.coinData)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data })
        }
    }

    onRowEditPressed = (itemToEdit) => {
        this.setState({
            itemToEdit,
            editMode: true,
            showModal: true
        });
    };

    onQuantityChanged = (coinName, quantity) => {
        const coinToUpdate = {
            name: coinName,
            quantity: quantity
        }

        this.setState({
            coinToUpdate
        })
    };

    updateUserCoins = () => {
        const coinToUpdate = this.state.coinToUpdate;
        const userCoins = this.props.userCoins;

        const positionToUpdate = userCoins.findIndex((coin) => {
            return coin.value = coinToUpdate.name
        })

        userCoins[positionToUpdate].quantity = coinToUpdate.quantity;

        this.props.setUserCoins(userCoins);
    };

    toggleEditMode = () => {
        const toggleEdit = !this.state.editMode;

        this.setState({
            editMode: toggleEdit
        })
    };

    /** RENDER **/

    renderEditButton() {
        return (
            <TouchableOpacity onPress={this.toggleEditMode}>
                <Text style={styles.editButton}>{"EDIT"}</Text>
            </TouchableOpacity>
        )
    };

    renderAddAssetButton() {
        return (
            <AddCoinComponent />
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
                        onSavePressed={this.updateUserCoins}
                        showModa={this.state.showModal}
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
                <View style={{ margin: 8 }}>
                    {this.renderEditButton()}
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                        extraData={this.state}
                    />
                    {this.renderAddAssetButton()}
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
