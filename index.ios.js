import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import { CoinCell } from './CoinCell';

export default class CoinCheckerRN extends React.Component {

        constructor(props) {
            super(props);
            const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
         this.state = {
             dataSource: dataSource.cloneWithRows(['row 1', 'row 2']),
        };

        // this._renderRow = this._renderRow.bind(this);

    }


    _renderRow() {
        return (
            <CoinCell title={"Test1"}></CoinCell>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    ref={'resultListView'}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <View><Text>{data}</Text></View>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


AppRegistry.registerComponent('CoincheckerRN', () => CoinCheckerRN);
