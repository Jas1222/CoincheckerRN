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
import { setUserCoinPortfolio } from 'CoinActions';
import PortfolioRow from 'PortfolioRow';
import AddCoinComponent from 'AddCoinComponent';

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
            itemToEdit: null
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
        console.warn('onRowEditPressed')
        console.warn(itemToEdit)
        this.setState({
            itemToEdit,
            // editMode: false
        });
    };

    toggleEditMode = () => {
        const toggleEdit = !this.state.editMode;

        this.setState({
            editMode: toggleEdit,
        })
    };

    renderEditButton = () => {
        return (
            <TouchableOpacity onPress={this.toggleEditMode}>
                <Text style={styles.editButton}>{"EDIT"}</Text>
            </TouchableOpacity>
        )
    };

    renderAddAssetButton = () => {
        return (
            <AddCoinComponent/>
        )
    };

    renderRow = (item) => {
        if (item.item == this.state.itemToEdit) {
           // TODO: INVALIDATE AFTER NULL??
            // this.setState({
            //     itemToEdit: null
            // });
            //
            return (
                <View>
                    <TextInput
                        mode={'outlined'}
                        placeholder={'Enter new quantity'}
                        onChangeText={(value) => {}}>

                    </TextInput>
                </View>
            )
        } else {
            return (
                <PortfolioRow
                    item={item.item}
                    fiatSymbol={this.state.fiatSymbol}
                    editMode={this.state.editMode}
                    onRowEditPressed={this.onRowEditPressed}
                />
            )
        }
    };

    renderPortfolioPrice = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.subtitle}> {'Your portfolio is worth:'}</Text>
                <Text style={styles.title}> {this.state.fiatSymbol}{this.props.totalPrice}</Text>
            </View>
        )
    };

    render() {
        return (
            <View>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
