/**
 * @providesModule Header
 * @flow
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    TouchableOpacity,
    LayoutAnimation,
    UIManager
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#03A9F4',
    },
    title: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: null,
            height: 60,
            expanded: false,
        }
    }

    _renderTitle() {
        const coinText = <Text style={[styles.title, ]}>COIN-CHECK</Text>;
        const settingsTest = <Text style={[styles.title, {textDecorationLine: 'underline'}]}>SETTINGS</Text>;

        let titleText = this.state.expanded ? settingsTest : coinText;

        return (
            <View>
                {titleText}
            </View>
        )
    }

    _onPress() {
        LayoutAnimation.easeInEaseOut();

        if (this.state.expanded) {
            this.setState({
                height: this.state.height - 150,
                expanded: false
            })
        } else {
            this.setState({
                height: this.state.height + 150,
                expanded: true
            })
        }

        this.setState({
            expanded: !this.state.expanded
        });
    }

    _renderHeader() {
        return (
            <TouchableOpacity onPress={this._onPress.bind(this)}>
                <View style={[styles.container, {height: this.state.height}]}>
                    { this._renderTitle() }
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                { this._renderHeader()}
            </View>
        );
    }
}

