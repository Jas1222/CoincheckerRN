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
import {
    getAllCoins, 
    setUserCoinWorth, 
    getUserCoins 
} from 'DataActions';
import ErrorMessage from 'ErrorMessage';

export class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Coins'
    };

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
        await this.props.getUserCoins();
        this.setState({refreshing: false});

        if (this.props.userCoins.length) {
            this.props.setUserCoinPortfolio(this.props.userCoins, this.props.coinData);
            console.warn('!! from redux store', this.props.portfolioData)
        }
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
        if (this.props.failedRequest && !this.props.lastRefreshed) {
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
        failedRequest: state.coinReducer.failedRequest,
        userCoins: state.coinReducer.userCoins,
        // TODO: MOVE TO PORTOFLIO SECTION
        portfolioData: state.coinReducer.portfolioData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCoins: () => {
            dispatch(getAllCoins());
        },
        setUserCoinPortfolio: (userCoinData, allCoins) => {
            dispatch(setUserCoinPortfolio(userCoinData, allCoins));
        },
        getUserCoins: () => {
            dispatch(getUserCoins())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
