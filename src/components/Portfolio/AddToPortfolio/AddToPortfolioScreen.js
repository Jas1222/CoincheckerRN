import React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import AddCoinCell from './components/AddCoinCell';
import SearchBar from './components/SearchBar';
import EditPortfolioItemComponent from '../DisplayPortfolio/components/EditPortfolioItemComponent';
import Modal from 'react-native-modal';
import { appTheme } from './../../../Colors';

export class AddToPortfolioScreen extends React.PureComponent {
    static navigationOptions = {
        title: 'Add Coins To Portfolio',
        headerStyle: {
            backgroundColor: appTheme.primary
        },
        headerTintColor: appTheme.secondaryText
    };

    constructor(props) {
        super(props);

        this.state = {
            coinData: null,
            showModal: false,
            coinToAdd: null
        }

    }

    componentDidMount() {
        this.setState({ coinData: this.props.coinData })
    }

    toggleModal = () => {
        this.setState({
            showModal: false,
            editMode: false
        })
    }

    onSearchWordEntered = (keyword) => {
        const data = this.props.coinData;

        const result = data.filter(coin => {
            const name = coin.name.toLowerCase();
            const lowercaseKeyword = keyword.toLowerCase();

            return name.includes(lowercaseKeyword);
        });


        this.setState({ coinData: result })
    }

    onAddPressed = (coinToAdd) => {
        this.setState({
            showModal: true,
            coinToAdd
        });
    }


    renderHeader = () => {
        return (
            <SearchBar onSearchWordEntered={this.onSearchWordEntered} />
        )
    }


    renderRow = (data) => {
        return (
            <AddCoinCell
                item={data.item}
                onPress={this.onAddPressed}
            />
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
            <View>
                <FlatList
                    data={this.state.coinData}
                    renderItem={this.renderRow}
                    ListHeaderComponent={this.renderHeader()}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.name}
                />

                <Modal
                    isVisible={this.state.showModal}
                    animationIn={'pulse'}
                    onBackdropPress={this.toggleModal}
                >
                    <EditPortfolioItemComponent
                        item={this.state.coinToAdd}
                        showModal={this.state.showModal}
                        expandedOptions={false}
                        toggleModal={this.toggleModal}
                    />
                </Modal>
            </View >
        )
    }
}

function mapStateToProps(state) {
    return {
        coinData: state.coinReducer.coinData
    };
}

export default connect(mapStateToProps, null)(AddToPortfolioScreen)
