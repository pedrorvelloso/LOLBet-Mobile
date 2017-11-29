import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Main from './Main';
import Jogos from './Jogos';
import Aposta from './Aposta';
import Bets from './Bets';

import Perfil from './Perfil';

const navigationConfig = {
    initialRouteName: 'HomeScreen',
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.routeName}`,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#2accd9', borderWidth: 0, borderColor: '#4b94af' },
        headerTitleStyle: { color: 'white' }
    }),
}

export const RootTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Listar Ligas',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Bets: {
        screen: Bets,
        navigationOptions: {
            tabBarLabel: 'Apostas',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-cash' : 'ios-cash-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
    Settings: {
        screen: Perfil,
        navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-person' : 'ios-person-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
}, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#fff',
            style: {
                backgroundColor: '#585374',
                paddingBottom: 2,
                height: 50
            }
        },
    });

export const RootNavigator = StackNavigator({
    HomeScreen: {
        screen: RootTabs,
        navigationOptions: {
            headerTitle: 'LOLBet',
            headerBackTitle: ' '
        },
    },
    Jogos: {
        path: 'ligas/:id',
        screen: Jogos,
        navigationOptions: {
            headerTitle: 'Jogos',
            headerBackTitle: ' '
        },
    },
    Aposta: {
        screen: Aposta,
        navigationOptions: {
            headerTitle: 'Fazer sua aposta',
            headerBackTitle: ' '
        },
    },
}, navigationConfig);



//export default RootTabs;