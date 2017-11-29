import React from 'react';

import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage, Modal, TextInput } from 'react-native';
import styles from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pubsub from 'pubsub-js';

import Constants from '../utils/Constants';
import Leagues from '../utils/Leagues';

export default class Perfil extends React.Component {

    constructor() {
        super();
        this.state = { user: {}, modalVisible: false, quantidade: 0, balance: 0 }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, user) => {
            let u = JSON.parse(user)
            this.setState({ user: u, balance: u.balance })
        })
    }

    _sair() {
        Pubsub.publish('logout', undefined);
    }

    _cancelar(visible) {
        this.setState({ modalVisible: visible, quantidade: null });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    inserir() {
        let balance = parseInt(this.state.quantidade) + parseInt(this.state.user.balance)
        console.log(balance);
        let body = { balance, cpf: this.state.user.cpf}

        let requestInfo = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }

        fetch(`${Constants.API_URL}/user/atualizar/balance/`, requestInfo)
        .then(response => {
            if(response.ok){
                let updateStorage = { balance }
                this.setState({balance, modalVisible: false})
                AsyncStorage.mergeItem('user', JSON.stringify(updateStorage))
                console.log('inserido');
            }else{
                throw new Error("Erro!")
            }
        }).catch()

    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                >
                    <View style={[styles.container]}>

                        <Text style={{ fontSize: 20, margin: 10 }}>Selecionar Quantidade:</Text>

                        <TextInput
                            placeholder="Quantidade..."
                            keyboardType="numeric"
                            style={{ backgroundColor: '#FFF', margin: 5, padding: 5, borderRadius: 5, alignContent: 'center' }}
                            onChangeText={(text) => this.setState({ quantidade: text })}
                        />

                        <TouchableHighlight
                            style={[styles.buttonAposta, styles.blue]}
                            onPress={this.inserir.bind(this)}
                        >
                            <Text style={styles.text}>Inserir</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.buttonAposta, styles.default]}
                            onPress={() => {
                                this._cancelar(!this.state.modalVisible)
                            }}
                        >
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableHighlight>

                    </View>
                </Modal>

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.apostaTitle}>Perfil</Text>
                    <View style={[styles.boxPerfil, {
                        flex: 1, flexDirection: 'row',
                    }]}>
                        <View style={{ width: 150, margin: 15 }}><Ionicons
                            name={'md-contact'}
                            size={150}
                            style={{ color: 'black' }}
                        /></View>
                        <View>
                            <Text style={styles.perfil}>{this.state.user.user}</Text>
                            <Text style={styles.perfil}>{this.state.user.eMail}</Text>
                            <Text></Text>
                            <TouchableHighlight
                                style={[styles.buttonPerfil, styles.red]}
                                onPress={this._sair.bind(this)}
                            >
                                <Text style={styles.text}>Sair</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}>
                        <View style={[styles.boxAdcionarSaldo, {
                            flex: 1, flexDirection: 'column',
                        }]}>
                            <View><Text style={{ fontSize: 12 }}>Adicionar Saldo <Ionicons
                                name={'ios-add-circle-outline'}
                                size={15}
                                style={{ color: 'black' }}
                            /></Text></View>
                            <View><Text style={{ fontSize: 25 }}>β{this.state.balance}</Text></View>
                        </View>
                    </TouchableHighlight>
                </ScrollView>

            </View>
        );
    }
}