import React from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import CreatePortfolioScreen from './CreatePortfolio/CreatePortfolioScreen'
import DisplayPortfolioScreen from './DisplayPortfolio/DisplayPortfolioScreen';


export class PortfolioIndex extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Portfolio',
        header: null
    };

    constructor(props) {
        super(props);
    }

    userHasCoins = () => {
        return this.props.coinData && this.props.coinData.length > 0
    };

    render() {
        return (
            <View style={{flex: 1}}>
            {this.userHasCoins() ? <DisplayPortfolioScreen/> : <CreatePortfolioScreen/>}            
            </View>
        )
        
    }

}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.userCoins,
    };
}

export default connect(mapStateToProps)(PortfolioIndex)
