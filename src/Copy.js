import React, { Component } from 'react';
import {
  Text,
  AppRegistry,
  View
} from 'react-native';

import Style from './Style'
import InputButton from './InputButtons';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

class ReactTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: null
    }
  }
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          {this.state._renderFromJson()}
        </View>
        <View style={Style.inputContainer}>
          <InputButton
            value="input"
            onPress={this._onInputButtonPressed.bind(this, "input")}
            key={0}/>
          </View>
        </View>
      )
    }
    _renderFromJson(){
      <Text style={Style.displayText}>{this.state.inputValue}</Text>
    }
    _onInputButtonPressed(input) {
      fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // alert(responseJson.movies)
        this.setState({
          inputValue: responseJson.movies[0].title
        })
        // return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
      // this.setState({
      //   inputValue: a
      // })
    }


  }

  AppRegistry.registerComponent('ReactTest', () => ReactTest);
