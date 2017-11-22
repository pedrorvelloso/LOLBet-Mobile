import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Jogos from './Jogos';

const navigationConfig = {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.routeName}`,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#2accd9', borderWidth: 0, borderColor: '#4b94af' },
        headerTitleStyle: { color: 'white' }
    }),
}

const RootNavigator = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: 'Selecione uma Liga',
            headerBackTitle: ' '
        },
        header: ({ state, setParams }) => ({
            style: { backgroundColor: 'green' }
        })
    },
    Jogos: {
        path: 'ligas/:id',
        screen: Jogos,
        navigationOptions: {
            headerTitle: 'Jogos',
        },
    }
}, navigationConfig);

export default RootNavigator;