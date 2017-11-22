import React from 'react';

import Login from './components/Login';
//import Home from './components/Home';
import Root from './components/Root';
import { Text, AsyncStorage } from 'react-native';

import Pubsub from 'pubsub-js';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {user: undefined};
  }

  componentWillMount(){
    
  }

  componentDidMount(){
    
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        this.setState({user: result});
      }
    });

    Pubsub.subscribe('login', (topic, user) => {
      this.setState({user});
    })
    Pubsub.subscribe('logout', (topic, user) => {
      AsyncStorage.clear();
      this.setState({user});
    })
  }

  render() {
    return (
      this.state.user === undefined ? <Login/> : <Root user={this.state.user} />
      //<Home user={this.state.user} />
      //<Root />
    );
  }
}