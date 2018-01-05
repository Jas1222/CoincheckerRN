import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl
} from 'react-native';
import CoinCell from './js/Components/CoinCell/CoinCell';
import Header from './Header';
import {getCryptocurrencyData} from './js/NetworkHandler'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false
        };

        this._renderRow = this._renderRow.bind(this);
        this._getCoinData = this._getCoinData.bind(this);
    }

    componentWillMount() {
        this._getCoinData();
    }

    _getCoinData() {
        return new Promise((resolve) => {
            getCryptocurrencyData()
                .then(function (result) {
                    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
                    console.log('!!!', result)
                    this.setState({
                        dataSource: ds.cloneWithRows(result),
                        jsonData: result
                    });
                    resolve();
                }.bind(this))
        });
    }


    _renderRow(data) {
        return (
            <CoinCell
                coinName={data.name}
                coinPrice={data.price_gbp}
                coinPercentageChange={data.percent_change_24h}>
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


    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    ref={'resultListView'}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                    renderHeader={() => this._renderHeader()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});