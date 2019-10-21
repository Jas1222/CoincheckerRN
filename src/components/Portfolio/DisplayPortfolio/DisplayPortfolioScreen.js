import React from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { styles } from './DisplayPortfolioScreenStyles';
import { getFiatSymbol } from '../../Utils/CoinAdapter';
import { setUserCoinPortfolio, setUserCoins } from '../../../redux/actions/CoinActions';
import PortfolioRow from './PortfolioRow';
import EditPortfolioItemComponent from './components/EditPortfolioItemComponent';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { appTheme } from '../../../Colors';

export class DisplayPortfolioScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fiatSymbol: getFiatSymbol(),
            editMode: false,
            itemToEdit: null,
            coinToUpdate: null,
            showModal: false
        };
    }

    onRowEditPressed = (itemToEdit) => {
        this.setState({
            itemToEdit,
            editMode: true,
            showModal: true
        });
    };

    toggleModal = () => {
        this.setState({
            showModal: false,
            editMode: false
        })
    }

    toggleEditMode = () => {
        const toggleEdit = !this.state.editMode;

        this.setState({
            editMode: toggleEdit
        })
    };

    renderEditBar() {
        return (
            <View style={styles.editContainer}>
                <View style={{ flexGrow: 1 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddCoinToPortfolio') }} >
                        <Text style={styles.editButton}>{"Add new asset"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexGrow: 1 }}>
                    <TouchableOpacity onPress={this.toggleEditMode} >
                        <Text style={styles.editButton}>{"Edit existing asset"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderRow = (item) => {
        return (
            <PortfolioRow
                item={item.item}
                fiatSymbol={this.state.fiatSymbol}
                editMode={this.state.editMode}
                onRowEditPressed={this.onRowEditPressed}
                onSavePressed={this.updateUserCoins}
            />
        )
    };

    renderPortfolioPrice() {
        return (
            <View style={styles.header}>
                <Text style={styles.subtitle}> {'Your portfolio is worth:'}</Text>
                <Text style={styles.title}> {this.state.fiatSymbol}{this.props.totalPrice}</Text>
            </View>
        )
    };

    renderCoinEditor() {
        if (!this.state.showModal) {
            return null;
        }

        return (
            <View>
                <Modal
                    isVisible={this.state.showModal && this.state.editMode}
                    animationIn={'pulse'}
                    onBackdropPress={this.toggleModal}
                >
                    <EditPortfolioItemComponent
                        item={this.state.itemToEdit}
                        showModal={this.state.showModal}
                        expandedOptions={true}
                        toggleModal={this.toggleModal}
                    />
                </Modal>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: appTheme.primaryBackgroundColor }}>
                {this.renderCoinEditor()}
                {this.renderPortfolioPrice()}
                {this.renderEditBar()}
                <View style={{ margin: 8 }}>
                    <FlatList
                        data={this.props.data}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                        extraData={this.state}
                    />
                </View>
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
        },
        setUserCoins: (userCoins) => {
            dispatch(setUserCoins(userCoins));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
