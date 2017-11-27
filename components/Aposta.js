import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage, TextInput, Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import styles from './Styles';
import Constants from '../utils/Constants';
import Teams from '../utils/Teams';

export default class Aposta extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: null, jogo: this.props.navigation.state.params, selecionado: '', modalVisible: false, quantidade: null, nextBalance: null };
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            let user = JSON.parse(result);
            this.setState({ user });
        })
    }

    _selecionaTime(cod) {
        this.setState({ selecionado: cod });
    }

    _apostar(qtd) {
        let user = this.state.user
        if (qtd < user.balance && qtd !== null && qtd > 0) {
            let newBalance = user.balance - qtd;
            this.setState({ quantidade: qtd, nextBalance: newBalance })
            this.setModalVisible(!this.state.modalVisible)
        } else {
            if (qtd > user.balance) {
                Alert.alert(`Saldo insuficiente. Disponível: ${user.balance}`)
            } else {
                Alert.alert(`Você deve selecionar um valor válido!`)
            }
        }
    }

    _cancelar(visible) {
        this.setState({ modalVisible: visible, quantidade: null });
    }

    confirmarAposta() {
        if (this.state.selecionado && this.state.quantidade) {

            let body = { usuario: this.state.user.id, partida: this.state.jogo.id, ganhador: this.state.selecionado, valor: this.state.quantidade }

            let requestInfo = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }

            fetch(`${Constants.API_URL}/bet/inserir/`, requestInfo)
                .then(response => {
                    if (response.ok) {
                        let updateStorage = { balance: this.state.nextBalance }
                        AsyncStorage.mergeItem('user', JSON.stringify(updateStorage))
                        Alert.alert(
                            'Aposta',
                            'Aposta realizada com sucesso!',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        throw new Error("Erro!");
                    }
                }).catch(err => {
                    Alert.alert('Erro ao fazer aposta!');
                })

        } else {
            Alert.alert('Selecione um time e um valor para sua aposta!')
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={[styles.container]}>

                        <Text style={{ fontSize: 20, margin: 10 }}>Selecionar Quantidade:</Text>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <TextInput
                                    placeholder="Quantidade..."
                                    keyboardType="numeric"
                                    style={{ backgroundColor: '#FFF', margin: 5, padding: 5, borderRadius: 5, alignContent: 'center' }}
                                    onChangeText={(text) => this.setState({ quantidade: text })}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableHighlight
                            style={[styles.buttonAposta, styles.blue]}
                            onPress={this._apostar.bind(this, this.state.quantidade)}
                        >
                            <Text style={styles.text}>Apostar</Text>
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

                <View style={styles.scrollContainer}>
                    <Text style={styles.apostaTitle}>Jogo #{this.state.jogo.id}</Text>
                    <View style={styles.containerAposta}>
                        <TouchableHighlight onPress={this._selecionaTime.bind(this, this.state.jogo.codParticipant1)}><View style={this.state.selecionado === this.state.jogo.codParticipant1 ? styles.boxHomesSelecionado : styles.boxHomes}><Image source={Teams[this.state.jogo.participant1.toLowerCase().replace(/\s/g, '').replace('-', '')]} style={styles.imgTeam} /><Text style={styles.boxJogo}>{this.state.jogo.participant1}</Text></View></TouchableHighlight>

                        <TouchableHighlight onPress={this._selecionaTime.bind(this, this.state.jogo.codParticipant2)}><View style={this.state.selecionado === this.state.jogo.codParticipant2 ? styles.boxHomesSelecionado : styles.boxHomes}><Image source={Teams[this.state.jogo.participant2.toLowerCase().replace(/\s/g, '').replace('-', '')]} style={styles.imgTeam} /><Text style={styles.boxJogo}>{this.state.jogo.participant2}</Text></View></TouchableHighlight>


                    </View>

                </View>

                <View style={styles.aposta}>
                    <TouchableHighlight
                        style={[styles.buttonAposta, styles.default]}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                    >
                        <Text style={styles.text}>{this.state.quantidade !== null && this.state.quantidade > 0 ? `Apostando: ${this.state.quantidade}` : 'Selecionar quantidade'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.buttonAposta, styles.blue]}
                        onPress={this.confirmarAposta.bind(this)}
                    >
                        <Text style={styles.text}>Apostar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}
