import React from 'react';
import {
    View,
    FlatList,
    Modal
} from 'react-native';
import CoinCell from '../CoinCell/CoinCell';
import Header from './Header';
import { connect } from 'react-redux';
import {
    getAllCoins,
    getUserCoins,
    setUserCoinPortfolio
} from '../../redux/actions/CoinActions';
import ErrorMessage from './ErrorMessage';

export class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Coins'
    };

    constructor(props) {
        super(props);

        this.state = {
            coinData: props.coinData,
            refreshing: false,
            showModal: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.coinData !== this.props.coinData) {
            this.props.setUserCoinPortfolio(nextProps.userCoins, nextProps.coinData);
        }
    }

    refresh = async () => {
        this.setState({ refreshing: true });
        await this.props.getAllCoins();
        await this.props.getUserCoins();

        this.setState({ refreshing: false });
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
                refresh={this.refresh}
                toggleModal={this.toggleModal}
            />
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
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Header />
                    <ErrorMessage
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh}
                        style={{ alignSelf: 'center', justifyContent: 'center' }}
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

    toggleModal = () => {
        const currentState = this.state.showModal;
        this.setState({showModal: !currentState})
    }

    renderModal = () => {
        return (
                <Modal
                    visible={this.state.showModal}
                    animationIn={'pulse'}
                    onBackdropPress={() => { }}
                    transparent={true}
                    >
                    <View style={{alignSelf: 'center', height: 200, width: 200, backgroundColor: 'red' }} />
                </Modal>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {this.renderContent()}
                {this.renderModal()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.coinData,
        userCoins: state.coinReducer.userCoins,
        failedRequest: state.coinReducer.failedRequest,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCoins: () => {
            dispatch(getAllCoins());
        },
        getUserCoins: () => {
            dispatch(getUserCoins())
        },
        setUserCoinPortfolio: (userCoins, allCoins) => {
            dispatch(setUserCoinPortfolio(userCoins, allCoins));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
