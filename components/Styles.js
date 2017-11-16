import React from 'react';
import { StyleSheet } from 'react-native';

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
  }
});