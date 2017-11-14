import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './Styles';
import Pubsub from 'pubsub-js';

export default class Home extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    _sair() {
        Pubsub.publish('logout', undefined);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Logado como {this.props.user.user}</Text>
                <TouchableHighlight
                    style={[styles.button, styles.red]}
                    onPress={this._sair.bind(this)}
                >
                    <Text style={styles.text}>Sair</Text>
                </TouchableHighlight>
            </View>
        );
    }
}