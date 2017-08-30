import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput,Slider, ToastAndroid, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { FormLabel, FormInput, Button } from 'react-native-elements'


const onLogin = (email, password) => {
  console.log(email, password) // user credentials
}

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : "",
      key  : ""
    }
  }
  // async _onButtonPress() {
  componentDidMount(){
    this.setNameFromLocalData()
  }
  _onButtonPress() {
    if(this.state.name.length == 0){
      ToastAndroid.showWithGravity('Vnosno polje ime in priimek ne sme biti prazno', ToastAndroid.LONG, ToastAndroid.CENTER);
      return;
    }
    if(this.state.key.length<3){
      ToastAndroid.showWithGravity('Kljuc mora biti dolžine 3', ToastAndroid.LONG, ToastAndroid.CENTER);
      return;
    }
    if(this.state.name.indexOf(' ') < 0){
      ToastAndroid.showWithGravity('Ime in priimek naj bosta ločena s presledkom', ToastAndroid.LONG, ToastAndroid.CENTER);
      return;
    }
    try {
      AsyncStorage.setItem("userName",this.state.name)
      AsyncStorage.setItem("key",this.state.key)

      // ToastAndroid.showWithGravity('Bravo', ToastAndroid.LONG, ToastAndroid.CENTER);
      Actions.ListOfItems({val: {name: this.state.name, key : this.state.key}});
    } catch(error) {
      console.error(error);
    }
  }

  setNameFromLocalData(){
    AsyncStorage.getItem("userName").then((value) => {
      if(value) this.setState({"name": value});
    }).done();
    AsyncStorage.getItem("key").then((value) => {
      if(value == null){
        this.setState({key : "" + Math.floor((Math.random() * 900) + 100)})
      }else{
        this.setState({"key": value});
      }
    }).done();
    AsyncStorage.getItem("num").then((value) => {
      if(value == null){
        AsyncStorage.setItem("num","0")
      }
    }).done();
  }
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{position:'absolute', bottom:10, top: 50}}>

          <FormLabel>Ime in priimek</FormLabel>
          <FormInput onChangeText={(name) => this.setState({name})} value={this.state.name} placeholderTextColor="#bebebe" placeholder="Ex. Janez Novak" />
          <FormLabel>Vaša generirana številka</FormLabel>
          <FormInput keyboardType = 'numeric' maxLength={3}  onChangeText={(key) => this.setState({key})} value={this.state.key} placeholderTextColor="#bebebe" placeholder="Ex. 32" />
          <Button
            raised
            iconRight
            backgroundColor='#2980b9'
            icon={{name: 'input'}}
            title='VSTOPI'
            onPress={this._onButtonPress.bind(this)}/>
        </ScrollView>
      </View>
    )
  }
}
