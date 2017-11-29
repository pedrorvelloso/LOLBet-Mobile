import React from 'react';

import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage, Modal, TextInput } from 'react-native';
import styles from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pubsub from 'pubsub-js';

import Constants from '../utils/Constants';
import Teams from '../utils/Teams';

export default class Bets extends React.Component {

    constructor() {
        super();
        this.state = { apostas: [], error: '' }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            let user = JSON.parse(result);
            fetch(`${Constants.API_URL}/bet/${user.id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Nenhuma aposta!")
                    }
                })
                .then(apostas => {
                    this.setState({ apostas })
                })
                .catch(err => {
                    this.setState({error : err.message});
                })
        })
    }

    formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
      }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.apostaTitle}>Apostas</Text>
                    <Text style={styles.apostaTitle}>{this.state.error}</Text>
                    {this.state.apostas.map(aposta => 
                        <View style={[styles.boxApostas, { flex: 1, flexDirection: 'column', padding: 10 }]} key={aposta.partida}>
                            <View>
                                <Text style={{color: '#fff'}}>Apostou β{aposta.valor} em {aposta.time} na partida #{aposta.partida}</Text>
                            </View>
                            <View>
                                <Text style={{color: '#fff', fontSize: 10}}>Em {this.formatDate(aposta.data)}</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

            </View>
        );
    }
}