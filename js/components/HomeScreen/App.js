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
import { getCryptocurrencyData } from 'NetworkHandler'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            loading: false
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
