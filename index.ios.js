import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import CoinCell from './CoinCell';
import Header from './Header';
import { getCryptocurrencyData } from './NetworkHandler'

export default class CoinCheckerRN extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(['row 1', 'row 2']),
        };

        getCryptocurrencyData();
        this._renderRow = this._renderRow.bind(this);
        this._updateList = this._updateList.bind(this);

    }

    _updateList(data) {
        // this.setState({ dataSource: this.state.dataSource.cloneWithRows(data)});

    }


    _renderRow() {
        return (
            <CoinCell coinName={'Bitcoin'} coinPrice={'£1,000'} coinPercentageChange={'-4.2%'}></CoinCell>        )
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
                    renderHeader={() => <Header />}
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
