import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import CoinCell from './js/Components/CoinCell/CoinCell';
import Header from './Header';
import {getCryptocurrencyData} from './js/NetworkHandler'

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

    _getCoinData() {
        return new Promise((resolve) => {
            this.setState({loading: true});

            getCryptocurrencyData()
                .then((result) => {
                    this.setState({
                        loading: false,
                        refreshing: false,
                        data: result,
                    });
                    resolve();
                })
        });
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
            <Header />
        )
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._getCoinData()
            .then(() => {
                this.setState({refreshing: false});
            });
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