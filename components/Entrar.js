import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image, Alert } from 'react-native';
import Pubsub from 'pubsub-js';

import Constants from '../utils/Constants';

import styles from './Styles';

export default class Entrar extends React.Component {

    constructor() {
        super();
        this.state = { username: '', senha: '' };
    }

    setModalVisible(visible) {
        Pubsub.publish('modal-entrar', visible);
    }

    _login() {
        let body = { username: this.state.username, password: this.state.senha }

        let requestInfo = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }

        Pubsub.publish('login', {user: 'Ilher'});

        /*fetch(`${Constants.API_URL}/login/mobile`, requestInfo)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro!");
            }
        })
        .then(user => {
            Pubsub.publish('login', user);
        }).catch(error => {
            Alert.alert("Erro ao realizar login!")
        });*/
    }

    teste () {
        Pubsub.publish('login', {user: 'Ilher'});
    }


    render() {
        return (
            <View style={styles.box}>
                <View style={styles.boxTop}>
                    <Text style={styles.boxTitle}>Realizar Login</Text>
                </View>
                <View style={styles.boxBottom}>
                    <TextInput
                        style={{ height: 50, width: 200 }}
                        placeholder="Usuário"
                        onChangeText={(username) => this.setState({ username })}
                        autoCorrect={false}
                    />
                    <Text></Text>
                    <TextInput
                        style={{ height: 50, width: 200 }}
                        placeholder="Senha"
                        onChangeText={(senha) => this.setState({ senha })}
                        secureTextEntry={true}
                    />
                    <TouchableHighlight
                        style={[styles.buttonBox, styles.blue]}
                        onPress={this.teste.bind(this)}>
                        <Text style={styles.text}>Entrar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.buttonBox, styles.default]}
                        onPress={() => {
                            this.setModalVisible(false)
                        }}>
                        <Text style={styles.text}>Cancela</Text>
                    </TouchableHighlight>



                </View>
            </View>
        );
    }
}