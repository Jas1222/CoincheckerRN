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
import { getStore } from 'GlobalStore';
import { getAllCoins } from 'DataActions';
import ErrorMessage from 'ErrorMessage';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coinData: props.coinData,
            refreshing: false,
        };

        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
    }

     refresh = async () => {
        this.setState({refreshing: true});
        await this.props.getAllCoins();
        this.setState({refreshing: false});
    };

    componentDidMount = () => {
        this.refresh();
    }

    renderRow = (data) => {
        return (
            <CoinCell
                name={data.item.name}
                price={data.item.price}
                percentageChange={data.item.percentageChange}
                symbol={data.item.symbol}>
            </CoinCell>)
    };

    renderHeader = () => {
        return (
            <Header
                refresh={this.refresh}/>
        )
    };

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

    renderContent = () => {
        if (this.props.failedRequest) {
            return (
                <View>
                    <Header
                        refresh={this.refresh}/>
                    <ErrorMessage/>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.props.coinData}
                    extraData={getStore().getState().coinReducer}
                    onRefresh={this.refresh}
                    refreshing={this.state.refreshing}
                    renderItem={this.renderRow}
                    ListHeaderComponent={this.renderHeader()}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.name}
                />
            )
        }
    };

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.coinData,
        failedRequest: state.coinReducer.failedRequest
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
