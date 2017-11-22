import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button, AsyncStorage } from 'react-native';
import styles from './Styles';
import Pubsub from 'pubsub-js';

import Constants from '../utils/Constants';
import Teams from '../utils/Teams';
import Footer from './Footer';

export default class Jogos extends React.Component {

    constructor() {
        super();
        this.state = { jogos: [] }
    }

    componentDidMount() {

        fetch(`${Constants.API_URL}/partidas/${this.props.navigation.state.params}/disponiveis`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Erro!");
                }
            })
            .then(jogos => {
                this.setState({ jogos });
            });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>

                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.scontainer}>
                        {this.state.jogos.map(time => {
                            let imgName = Teams[time.participant1.toLowerCase().replace(/\s/g, '').replace('-', '')];
                            let imgName2 = Teams[time.participant2.toLowerCase().replace(/\s/g, '').replace('-', '')];
                            return <View key={time.id} style={styles.boxJogos}><TouchableHighlight><Image resizeMode="contain" source={imgName} style={styles.imgTeams} /></TouchableHighlight><Text>vs</Text><TouchableHighlight><Image resizeMode="contain" source={imgName2} style={styles.imgTeams} /></TouchableHighlight></View>
                        }
                        )}
                    </View>
                </ScrollView>

            </View>
        );
    }
}