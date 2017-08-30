import React, { Component } from 'react';
import { View,Icon,Title, Text, TouchableOpacity } from 'react-native';
import { Actions, NavigationBar } from 'react-native-router-flux';

export default class MainNavBar extends Component {
  constructor(props) { //tle nastavis te neke default vrednosti; constructor
    super(props);
    this.state = {}
  }
  render() {
    return (
      <NavigationBar
        leftComponent = {<TouchableOpacity><Icon name="sidebar" /></TouchableOpacity>}
        centerComponent = {<Title>Bnanana</Title>}
        />
    )
  }
}
