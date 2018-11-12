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
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Header/>
                        <ErrorMessage
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh}
                            style={{alignSelf: 'center', justifyContent: 'center'}}
                        />
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.props.coinData}
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
            <View style={{flex: 1}}>
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
