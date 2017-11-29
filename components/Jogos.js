import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage } from 'react-native';
import styles from './Styles';

import Constants from '../utils/Constants';
import Teams from '../utils/Teams';
import Footer from './Footer';

export default class Jogos extends React.Component {

    constructor() {
        super();
        this.state = { jogos: [], error: '' }
    }

    componentDidMount() {

        fetch(`${Constants.API_URL}/partidas/${this.props.navigation.state.params}/disponiveis`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Nenhuma partida!");
                }
            })
            .then(jogos => {
                this.setState({ jogos });
            })
            .catch(err => {
                this.setState({error : err.message});
            })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>

                <ScrollView style={styles.scrollContainer}>
                {this.state.error ? <Text style={styles.apostaTitle}>{this.state.error}</Text> : <View></View>}
                    <View style={styles.scontainer}>
                        {this.state.jogos.map(jogo => {
                            let imgName = Teams[jogo.participant1.toLowerCase().replace(/\s/g, '').replace('-', '')];
                            let imgName2 = Teams[jogo.participant2.toLowerCase().replace(/\s/g, '').replace('-', '')];
                            return <TouchableHighlight key={jogo.id} onPress={() => this.props.navigation.navigate('Aposta', jogo)}><View style={styles.boxJogos}><Image resizeMode="contain" source={imgName} style={styles.imgTeams} /><Text>vs</Text><Image resizeMode="contain" source={imgName2} style={styles.imgTeams} /></View></TouchableHighlight>
                        }
                        )}
                    </View>
                </ScrollView>

            </View>
        );
    }
}