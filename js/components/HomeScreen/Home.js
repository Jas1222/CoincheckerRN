/**
 * @providesModule Home
 * @flow
 */

import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import CoinCell from 'CoinCell';
import Header from 'Header';
import { connect } from 'react-redux';
import { getCryptocurrencyData } from 'NetworkHandler';
import { getStore } from 'GlobalStore';
import { setCurrencyType, setNumberOfCoins, getAllCoins } from 'DataActions';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coinData: props.coinData,
            refreshing: false,
        };

        this._renderRow = this._renderRow.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.getAllCoins();
    }
    
    _renderRow(data) {
        return (
            <CoinCell
                name={data.item.name}
                price={data.item.price}
                percentChange={data.item.percentageChange}
                symbol={data.item.symbol}>
            </CoinCell>)
    }

    _renderHeader() {
        return (
            <Header
                refresh={this._onRefresh}/>
        )
    }

    _onRefresh() {
        this.props.getAllCoins();
    }

    _renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    render() {
        return (
                <FlatList
                    data={this.props.coinData}
                    extraData={this.props.coinData}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    renderItem={this._renderRow}
                    ListHeaderComponent={this._renderHeader()}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={item => item.name}
                />
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
        getAllCoins: () => {
            dispatch(getAllCoins());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
