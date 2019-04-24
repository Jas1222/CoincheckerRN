/**
 * @providesModule AddToPortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'DisplayPortfolioScreenStyles';
import AddCoinCell from 'AddCoinCell';

export class AddToPortfolioScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    renderHeader = () => {
        return (
            <View>

            </View>
        )
    }

    renderRow = (data) => {
        return (
           <AddCoinCell item={data.item} />
        )
    }

    renderSeparator = () => {
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
                renderItem={this.renderRow}
                ListHeaderComponent={this.renderHeader()}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={item => item.name}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.coinData
    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToPortfolioScreen)
