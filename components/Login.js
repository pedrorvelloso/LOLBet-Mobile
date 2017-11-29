import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Image, Modal, TextInput, Alert, AsyncStorage } from 'react-native';

import styles from './Styles';

import Entrar from './Entrar';
import Constants from '../utils/Constants';
import Pubsub from 'pubsub-js';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { pressEntrarStatus: false, pressRegisterStatus: false, modalVisible: false, modalVisibleRegister: false, username: '', password: '', user: '', cpf: '', eMail: '', cellphone: '' };
    }

    componentDidMount() {
        PubSub.subscribe('modal-entrar', (topic, modal) => {
            this.setState({ modalVisible: modal });
        });
    }

    _onHideUnderlayEntrar() {
        this.setState({ pressEntrarStatus: false });
    }

    _onShowUnderlayEntrar() {
        this.setState({ pressEntrarStatus: true, modalVisible: true });
    }

    _onHideUnderlayRegister() {
        this.setState({ pressRegisterStatus: false });
    }

    _onShowUnderlayRegister() {
        this.setState({ pressRegisterStatus: true, modalVisibleRegister: true });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setModalVisibleRegister(visible) {
        this.setState({ modalVisibleRegister: visible });
    }

    _login() {
        let body = { username: this.state.username, password: this.state.senha }

        let requestInfo = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }

        fetch(`${Constants.API_URL}/login/mobile`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Erro!");
                }
            })
            .then(user => {
                Pubsub.publish('login', { user: 'Ilher' });
                try {
                    AsyncStorage.setItem('user', JSON.stringify(user));
                } catch (error) {
                    // Error saving data
                }
            }).catch(error => {
                Alert.alert("Erro ao realizar login!")
            });
    }

    _cadastrar() {
        let body = {
            username: this.state.username,
            user: this.state.user,
            password: this.state.senha,
            cpf: this.state.cpf,
            eMail: this.state.eMail,
            cellphone: this.state.cellphone,
            cod_role: '2'
        }

        let requestInfo = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }

        fetch(`${Constants.API_URL}/user/inserir/`, requestInfo)
            .then(response => {
                if (response.ok) {
                    let bodyLogin = { username: this.state.username, password: this.state.senha }

                    let requestInfoLogin = {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bodyLogin)
                    }
                    fetch(`${Constants.API_URL}/login/mobile`, requestInfoLogin)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error("Erro!");
                            }
                        })
                        .then(user => {
                            Pubsub.publish('login', { user: 'Ilher' });
                            try {
                                AsyncStorage.setItem('user', JSON.stringify(user));
                            } catch (error) {
                                // Error saving data
                            }
                        }).catch(error => {
                            Alert.alert("Erro ao realizar login!")
                        });
                } else {
                    throw new Error("Erro ao cadastrar usuário! Verifique os campos.")
                }
            }).catch(err => {
                Alert.alert(err.message)
            })

    }

    render() {
        return (
            <View style={styles.container}>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={this.setModalVisible.bind(this, false)}
                >
                    <View style={styles.container}>
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
                                    onPress={this._login.bind(this)}>
                                    <Text style={styles.text}>Entrar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={[styles.buttonBox, styles.default]}
                                    onPress={() => {
                                        this.setModalVisible(false)
                                    }}>
                                    <Text style={styles.text}>Cancelar</Text>
                                </TouchableHighlight>



                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisibleRegister}
                    onRequestClose={this.setModalVisibleRegister.bind(this, false)}
                >
                    <View style={styles.container}>
                        <View style={styles.box}>
                            <View style={styles.boxTop}>
                                <Text style={styles.boxTitle}>Realizar Cadastro</Text>
                            </View>
                            <View style={styles.boxBottom}>
                                <TextInput
                                    style={{ height: 50, width: 200 }}
                                    placeholder="Nome"
                                    onChangeText={(user) => this.setState({ user })}
                                    autoCorrect={false}
                                />
                                <Text></Text>
                                <TextInput
                                    style={{ height: 50, width: 200 }}
                                    placeholder="Usuário"
                                    onChangeText={(username) => this.setState({ username })}
                                    autoCorrect={false}
                                />
                                <Text></Text>
                                <TextInput
                                    style={{ height: 50, width: 200 }}
                                    placeholder="Email"
                                    onChangeText={(eMail) => this.setState({ eMail })}
                                    autoCorrect={false}
                                />
                                <Text></Text>
                                <TextInput
                                    style={{ height: 50, width: 200 }}
                                    placeholder="Celular"
                                    onChangeText={(cellphone) => this.setState({ cellphone })}
                                    autoCorrect={false}
                                />
                                <Text></Text>
                                <TextInput
                                    style={{ height: 50, width: 200 }}
                                    placeholder="CPF"
                                    onChangeText={(cpf) => this.setState({ cpf })}
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
                                    onPress={this._cadastrar.bind(this)}>
                                    <Text style={styles.text}>Cadastrar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={[styles.buttonBox, styles.default]}
                                    onPress={() => {
                                        this.setModalVisibleRegister(false)
                                    }}>
                                    <Text style={styles.text}>Cancelar</Text>
                                </TouchableHighlight>



                            </View>
                        </View>
                    </View>
                </Modal>

                <Image source={require('../logo.png')} />
                <TouchableHighlight
                    style={this.state.pressEntrarStatus ? [styles.button, styles.redPress] : [styles.button, styles.red]}
                    onHideUnderlay={this._onHideUnderlayEntrar.bind(this)}
                    onShowUnderlay={this._onShowUnderlayEntrar.bind(this)}
                    onPress={this._onShowUnderlayEntrar.bind(this)}
                    onLongPress={this._onShowUnderlayEntrar.bind(this)}>
                    <Text style={styles.text}>Entrar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.state.pressRegisterStatus ? [styles.button, styles.defaultPress] : [styles.button, styles.default]}
                    onHideUnderlay={this._onHideUnderlayRegister.bind(this)}
                    onShowUnderlay={this._onShowUnderlayRegister.bind(this)}
                    onPress={this._onShowUnderlayRegister.bind(this)}
                    onLongPress={this._onShowUnderlayRegister.bind(this)}>
                    <Text style={styles.text}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}