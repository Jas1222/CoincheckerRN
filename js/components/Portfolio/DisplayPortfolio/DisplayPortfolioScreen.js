/**
+ * @providesModule CreatePortfolioScreen
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from 'DisplayPortfolioScreenStyles';
import { getFiatSymbol } from 'CoinAdapter';
import PortfolioRow from 'PortfolioRow';

export class DisplayPortfolioScreen extends React.Component {
    static navigationOptions = {
        // header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
             this.setState({ data: nextProps.data })
        }
    }

    renderRow = (item) => {
        return (
            <PortfolioRow item={item.item} >
        )
    }

    renderHeader = (item) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold'}}> {'Name'} </Text>
                <Text style={{fontWeight: 'bold'}}> {'Symbol'} </Text>
                <Text style={{fontWeight: 'bold'}}> {'Quantity'} </Text>
                <Text style={{fontWeight: 'bold'}}> {'Value'} </Text>
            </View>
        )
    }

    renderPortfolioPrice = () => {
        return (
            <View style={{height: 125, alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 22, fontWeight: '300'}}> {'Your portfolio is worth:'}</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center'}}> {getFiatSymbol()}{this.props.totalPrice}</Text>
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
                    ListHeaderComponent={this.renderHeader()}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.coinReducer.portfolioData,
        totalPrice: state.coinReducer.totalPrice
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // setUserCoinPortfolio: (userCoinData, allCoins) => {
        //     dispatch(setUserCoinPortfolio(userCoinData, allCoins));
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
