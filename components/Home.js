import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import styles from './Styles';
import Pubsub from 'pubsub-js';

export default class Home extends React.Component {

    _sair() {
        Pubsub.publish('logout', undefined);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <View style={[{height: 75}, styles.blue]}><Text style={styles.topText}>Selecione uma Liga</Text></View>
                <ScrollView style={{backgroundColor: '#4f9bb7'}} />
                <View style={[{height: 60,}, styles.default]}>
                    <Image source={require('../quit.png')} style={{left: 10, top: 20}} />
                    <Text>Sair</Text>
                </View>
              </View>
            /*<View style={styles.container}>
                <Text>Logado como {this.props.user.user}</Text>
                <TouchableHighlight
                    style={[styles.button, styles.red]}
                    onPress={this._sair.bind(this)}
                >
                    <Text style={styles.text}>Sair</Text>
                </TouchableHighlight>
            </View>*/
        );
    }
}