import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image, Button } from 'react-native';
import styles from './Styles';
import Pubsub from 'pubsub-js';

import Constants from '../utils/Constants';
import Leagues from '../utils/Leagues';
import Footer from './Footer';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = { ligas: [] };
    }

    componentDidMount() {
        fetch(`${Constants.API_URL}/leagues/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Erro!")
                }
            })
            .then(ligas => {
                this.setState({ ligas })
            })
    }

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

                <ScrollView style={styles.scrollContainer}>
                    {this.state.ligas[0] !== undefined ?
                        <View style={styles.scontainer}>
                            {this.state.ligas.map(liga => {
                                let imgName = Leagues[liga.name.toLowerCase().replace(/\s/g, '')];
                                return <TouchableHighlight onPress={() => this.props.navigation.navigate('Jogos', liga.id)} key={liga.id}><View style={styles.boxHome}><Image resizeMode="contain" source={imgName} style={styles.imgLeague} /></View></TouchableHighlight>
                            }
                            )}
                        </View>
                        : <Text>Carregandos...</Text>}
                </ScrollView>
                
            </View>
        );
    }
}