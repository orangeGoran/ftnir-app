import React, { Component } from 'react';
import {
  Text,
  AppRegistry,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import {
  Button,
  SideMenu,
  List,
  ListItem
} from 'react-native-elements';

import Style from './Style'
// import InputButton from './InputButtons';

// Define the input buttons that will be displayed in the calculator.

class ReactTest extends Component {
  constructor(props) { //tle nastavis te neke default vrednosti; constructor
    super(props);
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { //like $scope in angular, but not sure how it is working
      value : [],
      choosenData : [],
      // sideMenuOpened : true
    }
    // this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  // toggleSideMenu () {
  //   this.setState({
  //     sideMenuOpened: !this.state.sideMenuOpened
  //   })
  // }
  render() { //vsaka componenta include naj bi imela tale render
    // const MenuComponent = (
    //   <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
    //     <List containerStyle={{marginBottom: 20}}>
    //       {
    //
    //           <ListItem
    //             roundAvatar
    //             onPress={() => console.log('Pressed')}
    //             // avatar={l.avatar_url}
    //             // key={i}
    //             title='Bananna'
    //             subtitle='Mekone'
    //           />
    //
    //       }
    //     </List>
    //   </View>
    // )
    return ( //rednida pa nek view (react native component)
    // do css dostopamo preko objekta style, ki je pac importan zgoraj v 10 vrstici
    // <View style={Style.rootContainer} >
    //   {this._renderFromJson()}
    // </View>
    // <Button title='BUTTON' />
    // <SideMenu
    //   isOpen={this.state.sideMenuOpened}
    //   menu={MenuComponent}>
    //   {/* <App toggleSideMenu={this.toggleSideMenu.bind(this)} /> */}
    // </SideMenu>
  )// klicemo pa funkcijo ki zrendira json ki ga dobimo iz ftnir.bla.bla

}
_renderFromJson(){
  var data = []
  // fetch je funkcija $http (v angularju)
  // deluje sync, responseJson pa vsebuje podatke ki jih dobimo z requesta

  fetch('http://ftnir.famnit.upr.si/api/path/get_paths')
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
      value: responseJson
    })
  })
  .catch((error) => {
    console.error(error);
  });
  // se sprehodimo po podatkih in zrendiramo button, ki je nek touchable component
  for (var i = 0; i < this.state.value.length; i++) {
    //na vsak klik spet nova funckija ki dobi podatke za zahtevan klik in
    //alerta dobljene informacije
    data.push(<TouchableHighlight onPress={this._onPressButton.bind(this, i)} style={Style.inputButton} underlayColor="#193441" key={"row-"+i} ><Text style={Style.inputButtonText}>{this.state.value[i].name}</Text></TouchableHighlight>);
  }
  return data
}

async _onPressButton(index){//podobno kot zgornjhi renderFromJson
  var data = []

  try {
    let response = await fetch('http://ftnir.famnit.upr.si/api/path/get_path/'+index);
    let responseJson = await response.json();
    this.setState({
      choosenData: responseJson
    })
    alert(JSON.stringify(this.state.choosenData))
  } catch(error) {
    console.error(error);
  }


  // fetch('http://ftnir.famnit.upr.si/api/path/get_path/'+index)
  // .then((response) => response.json())
  // .then((responseJson) => {
  //   this.setState({
  //     choosenData: responseJson
  //   })
  // })
  // alert(JSON.stringify(this.state.choosenData))
}
}

AppRegistry.registerComponent('ReactTest', () => ReactTest);
