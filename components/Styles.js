import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f9bb7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
  },
  button: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 230,
  },
  buttonBox: {
    margin: 5,
    padding: 20,
    borderRadius: 25,
    width: 230,
  },
  blue: {
    backgroundColor: '#41cdf4'
  },
  red: {
    backgroundColor: '#ed6a6a',
  },
  redPress: {
    backgroundColor: '#993232'
  },
  default: {
    backgroundColor: '#585374'
  },
  defaultPress: {
    backgroundColor: '#333044'
  },
  box: {
    width: 350
  },
  boxTitle: {
    color: '#ffffff',
    fontSize: 20
  },
  boxBottom: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  boxTop: {
    backgroundColor: '#41cdf4',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  //Pages
  topText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 35,
    color: '#fff'
  },
  center: {
    justifyContent: 'center'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#4f9bb7'
  },
  scontainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    marginTop: 5,
  },
  boxHome: {
    margin: 4,
    width: Dimensions.get('window').width / 2 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 30,
    backgroundColor: '#a2bac3',
    borderWidth: 2,
    borderColor: '#abc8d3',
    borderRadius: 5
  },
  imgLeague: {
    height: 150,
  },
  imgTeams: {
    height: 100,
  },
  boxJogos: {
    margin: 4,
    width: Dimensions.get('window').width - 11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2bac3',
    borderWidth: 2,
    borderColor: '#abc8d3',
    borderRadius: 5
  },
  // APOSTA
  containerAposta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  apostaTitle: {
    padding: 15,
    color: '#FFF',
  },
  boxHomes: {
    margin: 4,
    alignItems: 'center',
    width: Dimensions.get('window').width - 11,
    backgroundColor: 'blue',
    backgroundColor: '#a2bac3',
    borderWidth: 2,
    borderColor: '#abc8d3',
    borderRadius: 5
  },
  boxHomesSelecionado: {
    margin: 4,
    alignItems: 'center',
    width: Dimensions.get('window').width - 11,
    backgroundColor: 'blue',
    backgroundColor: '#9ed3a9',
    borderWidth: 2,
    borderColor: '#62c977',
    borderRadius: 5
  },
  boxJogo: {
    color: '#FFF'
  },
  aposta: {
    backgroundColor: '#4f9bb7'
  },
  imgTeam: {
    height: 150,
    width: Dimensions.get('window').width - 11,
  },
  buttonAposta: {
    margin: 4,
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width - 10,
  },
  //PERFIL
  boxPerfil: {
    margin: 4,
    width: Dimensions.get('window').width - 11,
    backgroundColor: '#a2bac3',
    borderWidth: 2,
    borderColor: '#abc8d3',
    borderRadius: 5
  },
  boxAdcionarSaldo: {
    margin: 4,
    width: Dimensions.get('window').width - 11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    padding: 100
  },
  perfil: {
    fontSize: 20,
    marginTop: 15,
    color: 'white',
  },
  buttonPerfil: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  //Aposta tab
  boxApostas: {
    margin: 4,
    width: Dimensions.get('window').width - 11,
    backgroundColor: '#a2bac3',
    borderWidth: 2,
    borderColor: '#abc8d3',
    borderRadius: 5
  },
});