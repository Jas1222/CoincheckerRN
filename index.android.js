import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import CoinCell from './js/Components/CoinCell/CoinCell';
import Header from './Header';
import { getCryptocurrencyData } from './NetworkHandler'

export default class CoinCheckerRN extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
    };

    this._renderRow = this._renderRow.bind(this);
    this._getCoinData = this._getCoinData.bind(this);
  }

  componentWillMount() {
    this._getCoinData();
  }

  _getCoinData() {
    getCryptocurrencyData().then(function(result) {

      const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
      this.setState({
        dataSource: ds.cloneWithRows(result),
        jsonData: result
      });
    }.bind(this))
  }


  _renderRow(data) {
    return (
        <CoinCell coinName={data.name} coinPrice={data.price_gbp} coinPercentageChange={data.percent_change_24h}></CoinCell>        )
  }

  _renderHeader() {
    return (
        <Header />
    )
  }


  render() {
    return (
        <View>
          <ListView
              enableEmptySections
              ref={'resultListView'}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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


AppRegistry.registerComponent('CoincheckerRN', () => CoinCheckerRN);
