import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage, TextInput, Modal,TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from './Styles';
import Teams from '../utils/Teams';

export default class Aposta extends React.Component {

    constructor(props) {
        super(props);
        this.state = { jogo: this.props.navigation.state.params, selecionado: '', modalVisible: false, quantidade: null };
    }

    _selecionaTime(cod) {
        this.setState({ selecionado: cod });
    }

    _apostar(qtd) { 
        AsyncStorage.getItem('user', (err, result) => {
            let user = JSON.parse(result)
            console.log(qtd < user.balance);
          });
        //let hasBalance = 
    }

    componentDidMount() {
        console.log(this.state);
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

                    </View>
                </Modal>

                <View style={styles.scrollContainer}>
                    <Text style={styles.apostaTitle}>Jogo #{this.state.jogo.id}</Text>
                    <View style={styles.containerAposta}>
                        <TouchableHighlight onPress={this._selecionaTime.bind(this, this.state.jogo.codParticipant1)}><View style={styles.boxHomes}><Image source={Teams[this.state.jogo.participant1.toLowerCase().replace(/\s/g, '').replace('-', '')]} style={styles.imgTeam} /><Text style={styles.boxJogo}>{this.state.jogo.participant1}</Text></View></TouchableHighlight>

                        <TouchableHighlight onPress={this._selecionaTime.bind(this, this.state.jogo.codParticipant2)}><View style={styles.boxHomes}><Image source={Teams[this.state.jogo.participant2.toLowerCase().replace(/\s/g, '').replace('-', '')]} style={styles.imgTeam} /><Text style={styles.boxJogo}>{this.state.jogo.participant2}</Text></View></TouchableHighlight>


                    </View>

                </View>

                <View style={styles.aposta}>
                    <TouchableHighlight
                        style={[styles.buttonAposta, styles.default]}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                    >
                        <Text style={styles.text}>Selecionar quantidade</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.buttonAposta, styles.blue]}
                    >
                        <Text style={styles.text}>Apostar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}
