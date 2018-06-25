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
import { getCurrencyTypeJson } from 'CoinUtil';
import { getStore } from 'GlobalStore';
import { setCurrencyType, setNumberOfCoins } from 'DataActions';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false,
            loading: false,
            numberOfCoins: props.numberOfCoins,
            currencyType: props.currencyType
        };

        this._renderRow = this._renderRow.bind(this);
        this._getCoinData = this._getCoinData.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this._getCoinData();
    }

    async _getCoinData() {
        this.setState({loading: true});
        const result = await getCryptocurrencyData();

        this.setState({
            loading: false,
            refreshing: false,
            data: result,
        });
    }

    _renderRow(data) {
        const currencyTypeJson = getCurrencyTypeJson(data.item);
        
        return (
            <CoinCell
                name={data.item.name}
                price={currencyTypeJson}
                percentChange={data.item.percent_change_24h}
                symbol={data.item.symbol}>
            </CoinCell>)
    }

    _renderHeader() {
        return (
            <Header
                refresh={this._onRefresh}/>
        )
    }

    async _onRefresh() {
        this.setState({refreshing: true});
        await this._getCoinData();
        this.props.setCurrencyType(getStore().getState().coinReducer.currencyType)
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
                    data={this.state.data}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    extraData={this.state}
                    renderItem={this._renderRow}
                    ListHeaderComponent={this._renderHeader()}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={item => item.id}
                />
        );
    }
}

function mapStateToProps(state) {
    return {
        currencyType: state.coinReducer.currencyType,
        numberOfCoins: state.coinReducer.numberOfCoins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrencyType: () => {
            dispatch(setCurrencyType());
        },
        setNumberOfCoins: () => {
            dispatch(setNumberOfCoins());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
