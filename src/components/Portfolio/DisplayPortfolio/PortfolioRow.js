import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { getStyles } from './PortfolioRowStyles';
import Icon from 'react-native-vector-icons/Feather';

export default class PortfolioRow extends React.Component {

    constructor(props) {
        super(props);

        this.styles = getStyles(false);
    }

    render() {
        this.styles = getStyles(this.props.editMode);

        return (
            <View style={this.styles.container}>
                <View style ={this.styles.subcontainer}>
                    <View style={[this.styles.columnContainer]}>
                        <Text style={this.styles.bold}> {this.props.item.symbol} </Text>
                        <Text style={this.styles.name}> {this.props.item.name} </Text>
                    </View>


                    <View style={[this.styles.columnContainer, { alignItems: 'center' }]}>
                        <Text style={this.styles.bold}> {this.props.fiatSymbol}{this.props.item.userSum} </Text>
                        <Text style={this.styles.thin}> {this.props.item.quantity} </Text>
                    </View>
                </View>

                <Icon name="edit-2" 
                        size={30}
                        color={'#03A9F4'} 
                        style={ this.styles.editRowButton }
                        onPress={() => this.props.onRowEditPressed(this.props.item)}/>
            </View>

        );
    }
}
