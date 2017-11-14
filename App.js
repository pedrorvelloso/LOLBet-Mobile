import React from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { Text } from 'react-native';

import Pubsub from 'pubsub-js';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {user: undefined};
  }

  componentDidMount(){
    Pubsub.subscribe('login', (topic, user) => {
      this.setState({user});
    })
    Pubsub.subscribe('logout', (topic, user) => {
      this.setState({user});
    })
  }

  render() {
    return (
      this.state.user === undefined ? <Login/> : <Home user={this.state.user} />
    );
  }
}