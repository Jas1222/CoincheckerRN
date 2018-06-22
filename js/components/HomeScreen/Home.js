/**
 * @providesModule Home
 * @flow
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import CoinCell from 'CoinCell';
import Header from './Header';
import { connect } from 'react-redux';
import { getCryptocurrencyData } from 'NetworkHandler';
import { bindActionCreators } from 'redux';
import { rootReducer} from 'RootReducer';
import { getData } from 'DataActions';

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
        this.props.getData();
    }

    async _getCoinData() {
        this.setState({loading: true});

        const result = await getCryptocurrencyData();

        this.setState({
            loading: false,
            refreshing: false,
            data: result,
        })
    }


    _renderRow(data) {
        return (
            <CoinCell
                name={data.item.name}
                price={data.item.price_gbp}
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
        coinData: state.coinReducer.coinData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getData: () => {
            dispatch(getData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
