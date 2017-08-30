import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';


import ListOfItems from './pages/ListOfItems';
import SimpleForm from './pages/SimpleForm';
import LoginForm from './pages/LoginForm';

import { Icon } from 'react-native-elements'

class ReactTest extends Component {
  constructor(props) { //tle nastavis te neke default vrednosti; constructor
    super(props);
    this.state = {
      status : true
    }
  }
  render() {
    // note add
    return (
      <Router>
        <Scene key="root">
          <Scene key="LoginForm" component={LoginForm} title="Prijavi se" initial={true} />
          <Scene key="ListOfItems" component={ListOfItems}  title="Shranjeni elementi" />
          <Scene key="SimpleForm" component={SimpleForm} title="Dodaja novega elementa" />
        </Scene>
      </Router>
    );
  }

}
AppRegistry.registerComponent('ReactTest', () => ReactTest);
