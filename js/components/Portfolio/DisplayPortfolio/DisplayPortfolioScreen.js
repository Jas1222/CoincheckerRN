/**
 * @providesModule DisplayPortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'DisplayPortfolioScreenStyles';
import { getFiatSymbol } from 'CoinAdapter';
import { setUserCoinPortfolio } from 'CoinActions';
import PortfolioRow from 'PortfolioRow';

export class DisplayPortfolioScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fiatSymbol: getFiatSymbol()
        };
    }

    componentDidMount() {
        this.props.setUserCoinPortfolio(this.props.userCoins, this.props.coinData)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.data !== this.props.data){
             this.setState({ data: nextProps.data })
        }
    }

    renderRow = (item) => {
        return (
            <PortfolioRow item={item.item} fiatSymbol={this.state.fiatSymbol}/>
        )
    }

    renderPortfolioPrice = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.subtitle}> {'Your portfolio is worth:'}</Text>
                <Text style={styles.title}> {this.state.fiatSymbol}{this.props.totalPrice}</Text>
            </View>
        )
    }

    render() {

        return (
            <View>
                {this.renderPortfolioPrice()}
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.name}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.coinReducer.portfolioData,
        totalPrice: state.coinReducer.totalPrice,
        coinData: state.coinReducer.coinData,
        userCoins: state.coinReducer.userCoins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserCoinPortfolio: (userCoinData, allCoins) => {
            dispatch(setUserCoinPortfolio(userCoinData, allCoins));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
