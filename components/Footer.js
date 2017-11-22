import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button } from 'react-native';
import styles from './Styles';
import Pubsub from 'pubsub-js';

export default class Footer extends React.Component {

    _sair() {
        Pubsub.publish('logout', undefined);
    }

    render() {
        return (
            <View style={[{ height: 60, }, styles.default]}>
                <TouchableHighlight
                    style={{ width: 0 }}
                    onPress={this._sair.bind(this)}
                >
                    <Image source={require('../quit.png')} style={{ left: 10, top: 10, zIndex: 1 }} onPress={this._sair.bind(this)} />
                </TouchableHighlight>
                <Text style={{ left: 9, top: 12, color: '#FFF' }} >Sair</Text>
            </View>
        );
    }
}