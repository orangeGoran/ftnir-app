import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, ActivityIndicator, View, ScrollView, Text, TextInput,Slider, ToastAndroid, PermissionsAndroid,Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Choose photo',
  customButtons: [
    // {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class SimpleForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      generatedKey: "",
      num: -1,
      key: props.val.key,
      name: props.val.name,
      datumVzorcenja: moment().format("DD. MM. YYYY, ob HH:mm"),
      globina: "",
      povrsina: "",
      tipPridelka: "",
      rastlinjak: "",
      starostPridelka: "",
      predhodnaGnojenje: "",
      predEnimLetom: "",
      ostaliOrganskiMateriali: "",
      image: [],
      dodatneInformacije: "",
      rocnaLokacija: "",
      lokacija: "",
      lokacijaSet: false,
      lokacijaCas: "",
      locationError: "",
      lokacijaPridobitev: false,
      jeZaObdelavo: true,
      jePoslanNaApi: false
    }
  }

  componentDidMount() {
    this._getNewLocation()
    this.generateKey()
  }

  generateKey(){
    var strings = this.state.name.split(' ')
    AsyncStorage.getItem("num").then((value) => {
      if(isNaN(value)) value = 0
      var val = strings[0].substring(0,1).toUpperCase() + strings[1].substring(0,1).toUpperCase() + this.state.key + "-" + (value)
      this.setState({
        generatedKey : val,
        num : value
      })
    }).done();

  }

  _onButtonPressGetImage(){
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log();
        // alert('User cancelled image picker')

      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert('Error: ' + response.error)

      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert("Wtf??")
      }
      else {
        response.data = null
        // alert(JSON.stringify(response))
        // alert("should be done")
        let source = { uri: response.uri, type : response.type, name: response.fileName  };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source,
        });
        // alert(JSON.stringify(this.state.image))
      }
    });
  }

  _onButtonPressDeleteImg(){
    this.setState({
      'image' : {uri: null},
    })
  }

  _getNewLocation(){
    this.setState({
      lokacijaSet: false,
      lokacija: "",
      lokacijaCas: "",
      locationError: "",
      lokacijaPridobitev: true
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        // alert(JSON.stringify(position))
        this.setState({
          lokacijaSet: true,
          lokacija: position.coords.latitude + ", " + position.coords.longitude,
          lokacijaCas: moment().format("HH:mm"),
          lokacijaPridobitev: false
        });
      },
      (error) => {
        // alert(JSON.stringify(error))
        this.setState({
          locationError: "Neuspešna pridobitve lokacije: '" + error.message + "'. Poskusite še enkrat ali ročno vnesite ime lokacije spodaj.",
          lokacijaPridobitev: false
        })
      },
      {enableHighAccuracy: true, timeout: 40000, maximumAge: 1000}
      // {enableHighAccuracy: true, timeout: 3000, maximumAge: 30}
    );
  }
  async _onButtonPressSave() {
    if(this.state.editButton == false){ //ni v uporabi
      ToastAndroid.showWithGravity('Wait! Pikachu is not ready yet! ', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return
    }

    await AsyncStorage.setItem(this.state.generatedKey,JSON.stringify(this.state))
    var val = ""+(parseInt(this.state.num) + 1)
    // var val = ""+(parseInt("0") + 1)

    // alert(val);
    // alert()
    await AsyncStorage.setItem("num", val)
    alert("Podatki uspešno shranjeni pod kodo: "+ this.state.generatedKey +". Ze prenos na strežnik pojdite nazaj.");

    this.setState({
      // name: props.name,
      generatedKey: "",
      num: -1,
      // key: props.val.key,
      // name: props.val.name,
      datumVzorcenja: moment().format("DD. MM. YYYY, ob HH:mm"),
      globina: "",
      povrsina: "",
      tipPridelka: "",
      rastlinjak: "",
      starostPridelka: "",
      predhodnaGnojenje: "",
      predEnimLetom: "",
      ostaliOrganskiMateriali: "",
      image: [],
      dodatneInformacije: "",
      rocnaLokacija: "",
      lokacija: "",
      lokacijaSet: false,
      lokacijaCas: "",
      locationError: "",
      jeZaObdelavo: true,
      jePoslanNaApi: false
      // lokacijaPridobitev: false
    })
    this.generateKey()
    this._getNewLocation()
    // alert(JSON.stringify(this.state));
    // return;
    // try {
    //   this.setState({
    //     editButton: false //ni v uporabi
    //   })
    //   let response = await fetch('http://192.168.0.18:4321/test/', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(this.state)
    //   })
    //   // let responseJson = await response.json();
    //   if(response.status == 200){
    //     // ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    //     ToastAndroid.showWithGravity('Pika... pikaaaa... pikachuuuu got your data and saved them ', ToastAndroid.LONG, ToastAndroid.CENTER);
    //
    //   }else{
    //     alert(JSON.stringify(response))
    //   }
    // } catch(error) {
    //   console.error(error);
    // }
  }
  getTextForLokacijaVreme(){
    return " pridobljena ob "+this.state.lokacijaCas
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1, position:'absolute', bottom:10, top: 50}}>
          <FormLabel>Prijavljeni ste kot {this.state.name}, {this.state.key}. Vaš generiran kljuc je:</FormLabel>
          <Button style={{marginTop:20}}  large backgroundColor='#2980b9' icon={{name: 'report'}} title={this.state.generatedKey} />
          {/* {this.state.error ? <FormLabel>Napaka: {this.state.error}</FormLabel> : null} */}

          <FormLabel>Datum vzorčenja</FormLabel>
          {/* <FormInput placeholderTextColor="#bebebe" placeholder="Vnesite datum vzorčenja" onChangeText={(datumVzorcenja) => this.setState({datumVzorcenja})} value={this.state.datumVzorcenja}/> */}
          <DatePicker
              style={{width: "100%", padding:15}}
              date={this.state.datumVzorcenja}
              mode="datetime"
              placeholder="Vnesite datum vzorčenja"
              format="DD. MM. YYYY, ob HH:mm"
              minDate="01. 03. 2017"
              confirmBtnText="Potrdi"
              cancelBtnText="Prekliči"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({datumVzorcenja: date})}}
            />
          <View style={{flexDirection: 'row'}}>
            <FormLabel>Za obdelavo: {this.state.jeZaObdelavo ? "Da" : "Ne"}</FormLabel>
            {/* <FormInput placeholderTextColor="#bebebe" placeholder="Vnesite globino" onChangeText={(globina) => this.setState({globina})} value={this.state.globina}/> */}
            <Switch onValueChange={(value) => this.setState({jeZaObdelavo: value})}  value={this.state.jeZaObdelavo} />
          </View>
          <FormLabel>Globina</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Vnesite globino" onChangeText={(globina) => this.setState({globina})} value={this.state.globina}/>

          <FormLabel>Površina v m2</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Vnesite površino v kvadratnih metrih" onChangeText={(povrsina) => this.setState({povrsina})} value={this.state.povrsina}/>

          <FormLabel>Tip pridelka</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Prosimo vnesite tip pridelka" onChangeText={(tipPridelka) => this.setState({tipPridelka})} value={this.state.tipPridelka}/>

          <FormLabel>Rastlinjak</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Podatki za rastlinjak" onChangeText={(rastlinjak) => this.setState({rastlinjak})} value={this.state.rastlinjak}/>

          <FormLabel>Starost pridelka</FormLabel>
          {/* <Slider value={this.state.starostPridelka} step={1} minimumValue={0} maximumValue={100} onValueChange={(starostPridelka) => this.setState({starostPridelka})} /> */}
          <FormInput placeholderTextColor="#bebebe" placeholder="Prosimo vnesite starost pridelka" onChangeText={(starostPridelka) => this.setState({starostPridelka})} value={this.state.starostPridelka} />

          <FormLabel>Predhodna gnojenje</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Vpišite predhodne gnojenje" onChangeText={(predhodnaGnojenje) => this.setState({predhodnaGnojenje})} value={this.state.predhodnaGnojenje}/>

          <FormLabel>Pred enim letom</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Podatki za pred enim letom" onChangeText={(predEnimLetom) => this.setState({predEnimLetom})} value={this.state.predEnimLetom}/>
          <FormLabel>Ostali organski materiali</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Vpišite ostale organske materiale" onChangeText={(ostaliOrganskiMateriali) => this.setState({ostaliOrganskiMateriali})} value={this.state.ostaliOrganskiMateriali}/>


          <FormLabel style={{marginBottom:20}}>Slika</FormLabel>
          {this.state.image.uri == null ? <Icon style={{marginBottom:40}} onPress={this._onButtonPressGetImage.bind(this)} name='add-a-photo'/> : <Icon onPress={this._onButtonPressDeleteImg.bind(this)} name='delete'/> }

          {this.state.image.uri != null ? <Image source={this.state.image} style={styles.uploadedImage} /> : null }

          <FormLabel>Dodatne informacije</FormLabel>
          <FormInput placeholderTextColor="#bebebe" placeholder="Vpišite dodatne informacije" onChangeText={(dodatneInformacije) => this.setState({dodatneInformacije})} value={this.state.dodatneInformacije}/>

          <FormLabel>Trenutna GPS lokacija{!this.state.lokacijaCas == "" ? this.getTextForLokacijaVreme() : " - cca 40sec"}</FormLabel>
          {!this.state.lokacijaSet && !this.state.locationError ? <ActivityIndicator animating={true} style={[styles.centering, {height: 80}]} size="large" /> : null}
          {this.state.lokacija != "" ? <FormInput placeholderTextColor="#bebebe" placeholder="Prosimo vnesite lokacijo" onChangeText={(lokacija) => this.setState({lokacija})} value={this.state.lokacija}/> : null}
          {this.state.locationError != "" ? <FormLabel>Napaka: {this.state.locationError}</FormLabel> : null}
          {this.state.locationError || this.state.lokacijaSet ? <Button onPress={this._getNewLocation.bind(this)} small icon={{name: 'cached'}} title='OSVEŽI LOKACIJO' /> : null}
          {this.state.lokacijaSet ? <FormLabel /> : null}
          {this.state.locationError != "" ? <FormLabel>Ročni vnos lokacije (ime mesta)</FormLabel> : null }
          {this.state.locationError != "" ? <FormInput placeholderTextColor="#bebebe" placeholder="V primeru neuspešnega GPS iskanja ročno vnesite lokacijo(imensko)" onChangeText={(rocnaLokacija) => this.setState({rocnaLokacija})} value={this.state.rocnaLokacija}/> : null }

          {!this.state.lokacijaPridobitev ? <Button style={{marginTop:20}} onPress={this._onButtonPressSave.bind(this)} large backgroundColor='#2980b9' icon={{name: 'archive'}} title='SAVE DATA TO LOCAL STORAGE' /> : <FormLabel>Iščem lokacijo... Šele po končanem iskanju trenutne lokacije (uspešnem ali neuspešnem) je omogočena možnost shranjevanja.</FormLabel> }
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  uploadedImage:{
    // width: "100%",
    // height: 200,
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: 'contain',
    marginBottom:20
  }
});
