/**
 * @providesModule EditCoinComponent
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class EditCoinComponent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            enabled: false
        };
    }

    onPress = () => {
        console.warn('! hi')
        const enable = this.state.enabled ? false : true
        this.setState({
            enabled: enable
        });
    }

    render() {
        return (
                <TouchableOpacity onPress={this.onPress} style={{height: 40, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', marginTop: 10}}>
                    <Icon name="plus-circle" size={20} color="#03A9F4" style={{marginRight: 5}} />  
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>{"ADD NEW ASSET"}</Text>
                </TouchableOpacity>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(DisplayPortfolioScreen)
