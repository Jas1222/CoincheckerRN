import React from 'react';
import {
    View,
    Text,
    RefreshControl,
    ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import styles from './ErrorMessageStyles';

export default class ErrorMessage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        }
    }

    render() {
        return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.props.onRefresh}
                            title={"Pull to refresh"}
                        />
                    }
                    contentContainerStyle={styles.container}>

                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                        <Icon name="emoji-sad" size={50} style={styles.icon}/>
                        <Text style={styles.title}>Unable to fetch data</Text>
                        <Text style={styles.subtitle}>Swipe down to try again</Text>
                    </View>

                </ScrollView>
        )
    }
}
