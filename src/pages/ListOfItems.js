import React, { Component } from 'react';
import { AsyncStorage,Image,ToastAndroid, ActivityIndicator,StyleSheet, View, Text,ScrollView, ListView, Modal, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { List, ListItem, FormLabel, FormInput } from 'react-native-elements'
// import { List, ListItem } from 'react-native-elements'
import { Style } from '../Style'
var RNFS = require('react-native-fs');
// var url = 'http://192.168.1.101:4321/post'
var url = 'http://ftnir.famnit.upr.si/api/path/add_data'
var scio_data_location = '/storage/emulated/0/scio_dumps'
var stevec = 0

export default class ListOfItems extends Component {
  constructor(props) { //tle nastavis te neke default vrednosti; constructor
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { //like $scope in angular, but not sure how it is working
      values: ds,
      primaryValues: [],
      ds : ds,
      name: props.val.name,
      key: props.val.key,
      choosenData : [],
      modalVisible: false,
      modalData: [],
      modalData1n: "",
      modalData1p: "",
      modalData1k: "",
      modalData1ph: "",
      modalData1organskaSnov: "",
      showLoading: false,
      currentLoading: "",
      successUpload: false,
      datas : [],
      allowButtonPress: true
    }
  }
  // componentwillMount(){
  //   alert("bfsdabf")
  // }
  componentDidMount(){
    console.log("componentDidMount");
    this.fetchValues();
  }
  _onButtonPressAddNewElement() {
    try {
      // ToastAndroid.showWithGravity('Bravo', ToastAndroid.LONG, ToastAndroid.CENTER);
      Actions.SimpleForm({val: {name: this.state.name,key: this.state.key}});
    } catch(error) {
      console.error(error);
    }
  }

  _onButtonPressReset(){
    // alert(JSON.stringify(this.state.datas))
    this.setState({successUpload: false})
    this.fetchValues()
  }
  async _onButtonPressUpload(){
    await this.setState({
      allowButtonPress: false,
      showLoading: false,
      currentLoading: "",
      successUpload: false
    })
    try {
      let files = await RNFS.readdir(scio_data_location) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      console.log(files);
      for (var i = 0; i < files.length; i++) {
        if(files[i] == "request.json") continue;
        var filePath = scio_data_location + '/' + files[i]
        this.setState({
          showLoading: true,
          currentLoading: files[i],
        });
        var data = await RNFS.readFile(filePath, 'utf8')
        // console.log(data);
        var request = {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: data
        }
        // console.log(data);
        let response = await fetch(url,request);
        // let responseJson1 = await response.text();
        // console.log(responseJson1);
        console.log(response);
        if(response.status != 200) {
          throw 'Server error: ' + response.status
          return;
        }
        let responseJson = await response.json();
        // console.log(response);
        // console.log("SCIO FILES: ",(responseJson));
        // let finalResponse = (responseJson)
        // alert(finalResponse)
        // alert(finalResponse.status + ' ' + finalResponse.success + ' ' + finalResponse.text)
        if(responseJson.status == 200 && responseJson.success) {
          // await RNFS.unlink(filePath) // je za testirati ce dela sploh
          console.log("success");
        }else {
          throw responseJson.text;
        }
        this.setState({
          showLoading: false,
          currentLoading: ""
        });
      }
    } catch (e) {
      alert(e)
      console.log(e);
    }

    //scio ----END


    this.setState({
      showLoading: false,
      currentLoading: "",
      successUpload: false
    });
    var tmp = this.state.primaryValues
    for (var i = 0; i < this.state.primaryValues.length; i++) {
      console.log("jePoslanNaApi " + this.state.primaryValues[i].jePoslanNaApi, " za " + this.state.primaryValues[i].generatedKey);
      if(this.state.primaryValues[i].jePoslanNaApi || !this.state.primaryValues[i].laboratorisjkiPodatkiStatus){
        continue;
      }
      try {
        this.setState({
          showLoading: true,
          currentLoading: this.state.primaryValues[i].generatedKey,
        });
        var formData = new FormData();
        formData.append("generatedKey",this.state.primaryValues[i].generatedKey)
        formData.append("num",this.state.primaryValues[i].num)
        formData.append("key",this.state.primaryValues[i].key)
        formData.append("name",this.state.primaryValues[i].name)
        formData.append("datumVzorcenja",this.state.primaryValues[i].datumVzorcenja)
        formData.append("globina",this.state.primaryValues[i].globina)
        formData.append("povrsina",this.state.primaryValues[i].povrsina)
        formData.append("tipPridelka",this.state.primaryValues[i].tipPridelka)
        formData.append("rastlinjak",this.state.primaryValues[i].rastlinjak)
        formData.append("starostPridelka",this.state.primaryValues[i].starostPridelka)
        formData.append("predhodnaGnojenje",this.state.primaryValues[i].predhodnaGnojenje)
        formData.append("predEnimLetom",this.state.primaryValues[i].predEnimLetom)
        formData.append("ostaliOrganskiMateriali",this.state.primaryValues[i].ostaliOrganskiMateriali)
        // formData.append("image",this.state.primaryValues[i].image)
        formData.append("dodatneInformacije",this.state.primaryValues[i].dodatneInformacije)
        formData.append("rocnaLokacija",this.state.primaryValues[i].rocnaLokacija)
        formData.append("lokacija",this.state.primaryValues[i].lokacija)
        formData.append("lokacijaSet",this.state.primaryValues[i].lokacijaSet)
        formData.append("lokacijaCas",this.state.primaryValues[i].lokacijaCas)
        // formData.append("locationError",this.state.primaryValues[i].locationError)
        formData.append("lokacijaPridobitev",this.state.primaryValues[i].lokacijaPridobitev)
        formData.append("jeZaObdelavo",this.state.primaryValues[i].jeZaObdelavo)
        formData.append("n",this.state.primaryValues[i].n)
        formData.append("p",this.state.primaryValues[i].p)
        formData.append("k",this.state.primaryValues[i].jeZaObdelavo)
        formData.append("ph",this.state.primaryValues[i].ph)
        formData.append("organskaSnov",this.state.primaryValues[i].organskaSnov)
        if(this.state.primaryValues[i].image.uri){
          formData.append("image",this.state.primaryValues[i].image)

        }
        var data = {
          method: 'POST',
          headers: {
            'Content-Type': "multipart/form-data"
          },
          body: formData
        }

        // if(this.state.primaryValues[i].image.uri){
        //   var data = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': "multipart/form-data"
        //     },
        //     body: formData
        //   }
        // }else{
        //   var data = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': "application/json"
        //     },
        //     body: JSON.stringify(this.state.primaryValues[i])
        //   }
        // }
        // console.log(data.body);

        let response = await fetch(url,data);
        if(response.status != 200) {
          throw 'Server error: ' + response.status
          return;
        }
        let responseJson = await response.json();
        console.log(response);
        console.log("record : ",(responseJson));
        // let finalResponse = (responseJson)
        // alert(finalResponse)
        // alert(finalResponse.status + ' ' + finalResponse.success + ' ' + finalResponse.text)
        if(responseJson.status == 200 && responseJson.success) {
          // await RNFS.unlink(filePath) // je za testirati ce dela sploh
          console.log("success");
        }else {
          throw responseJson.text;
        }

        // let response = await fetch(url,data);
        // console.log(response);
        // if(response.status != 200) {
        //   throw 'Server error: ' + response.status
        //   return;
        // }
        // let responseJson = await response.text();
        // responseJson = await response.json();
        // console.log(responseJson);
        // console.log("RECORD: ",JSON.parse(responseJson));
        // let finalResponse = JSON.parse(responseJson)

        // let responseJson = await response.text();
        // console.log("RECORD: ",responseJson);
        // // console.log(response);
        // // console.log(response.status);
        // if(response.status !== 200){
        //   alert("Neuspešno nalganje! Napaka na serverju! Status: " + response.status)
        //   let responseJson = await response.text();
        //   console.log(responseJson);
        //   this.setState({
        //     allowButtonPress: true,
        //     showLoading: false,
        //     currentLoading: "",
        //     successUpload: false,
        //   })
        //   return;
        // }
        // let responseJson = await response.text();
        // console.log(responseJson);

        this.setState({
          showLoading: false,
          currentLoading: ""
        });
        let file1 = JSON.parse(await AsyncStorage.getItem(this.state.primaryValues[i].generatedKey))
        file1.jePoslanNaApi = true
        await AsyncStorage.setItem(this.state.primaryValues[i].generatedKey, JSON.stringify(file1))
        ToastAndroid.show("Uspešno naložen vzorec: " + tmp[i].generatedKey + " " ,ToastAndroid.SHORT)
        this.state.primaryValues[i].jePoslanNaApi = true
      } catch(error) {
        this.setState({
          allowButtonPress: true,
          showLoading: false,
          currentLoading: "",
          successUpload: false,
        })
        alert(error)
        return;
      }
    }
    this.setState({
      allowButtonPress: true,
      showLoading: false,
      currentLoading: "",
      successUpload: true,
    })
    this.fetchValues()
  }

  fetchValues(){
    // alert(JSON.stringify(await AsyncStorage.getItem("VB119-0")))
    // return;
    AsyncStorage.getAllKeys((err, keys) => {
      // alert(JSON.stringify(keys))
      // AsyncStorage.multiRemove(keys,(err) => {
      //   alert(err)
      // })
      // return;
      AsyncStorage.multiGet(keys, (err, stores) => {
        var data = []
        console.log(stores);
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];

          if(key != "key" && key != "num" && key != "userName"){
            var tmp = JSON.parse(store[i][1]);
            if(!tmp.jePoslanNaApi){ //ce je ze poslanNaApi ga ne bos pokazal
              data.push(JSON.parse(store[i][1]));
            }
          }
        });
        if(data.length != 0){
          this.setState({
            values: this.state.ds.cloneWithRows(data),
            primaryValues: data
          })
        }
      });
    });
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        // title={rowData.generatedKey + ' ' + (rowData.jePoslanNaApi ? " - poslan": "")}
        title={rowData.generatedKey + ' ' + (rowData.laboratorisjkiPodatkiStatus ? "": " - nedokončan")}
        onPress={this._onButtonPressShowInfo.bind(this,rowData)}
      />
    )
  }
  _onButtonPressShowInfo(data){
    // alert(JSON.stringify(data))
    console.log(data.n !== null  && data.n !== undefined);
    data.n !== null && data.n !== undefined ? this.setState({modalData1n : data.n}) : this.setState({modalData1n : ""});
    data.p !== null && data.p !== undefined ? this.setState({modalData1p : data.p}) : this.setState({modalData1p : ""});
    data.k !== null && data.k !== undefined ? this.setState({modalData1k : data.k}) : this.setState({modalData1k : ""});
    data.ph !== null && data.ph !== undefined ? this.setState({modalData1ph : data.ph}) : this.setState({modalData1ph : ""});
    data.organskaSnov !== null && data.organskaSnov !== undefined ? this.setState({modalData1organskaSnov : data.organskaSnov}) : this.setState({modalData1organskaSnov : ""});
    this.setState({modalData: data, modalVisible:true})
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalInvisible(visible) {
    this.setState({modalVisible: visible});
    this.fetchValues()
  }
  async _onButtonPressSave(data) {
    // if(this.state.editButton == false){ //ni v uporabi
    //   ToastAndroid.showWithGravity('Wait! Pikachu is not ready yet! ', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //   return
    // }
    console.log("saveing!", this.state.modalData1n);
    // console.log("saveing!", this.state.modalData1p);
    // console.log("saveing!", this.state.modalData1k);
    // console.log("saveing!", this.state.modalData1ph);
    // console.log("saveing!", this.state.modalData1organskaSnov);
    data.n = this.state.modalData1n
    data.p = this.state.modalData1p
    data.k = this.state.modalData1k
    data.ph = this.state.modalData1ph
    data.organskaSnov = this.state.modalData1organskaSnov
    data.laboratorisjkiPodatkiStatus = true
    // console.log(data);


    await AsyncStorage.setItem(data.generatedKey,JSON.stringify(data))
    // var val = ""+(parseInt("0") + 1)

    // alert(val);
    // alert()
    // await AsyncStorage.setItem("num", val)
    alert("Labooratorijski podatki uspešno shranjeni za testni primer: " + data.generatedKey);
  }
  render(){
    return (
      <View style={{flex:1}}>
        <View style={{position:'absolute',flex:1,top:50}}>
          <FormLabel labelStyle={{color:'#2980b9',textAlign:'center',flex:1}}>Prijavljeni ste kot: {this.state.name}, {this.state.key}. Trenutni lokalni shranjeni elementi so zvrščeni spodaj. Za dodajo novega elementa je gumb desno spodaj v kotu. Za posodobitev je desni gumb in levi gumb za pošiljanje podatkov na server(pošlje tudi scio podatke).</FormLabel>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Icon onPress={this.state.allowButtonPress ? this._onButtonPressUpload.bind(this) : null} raised color='#34495e' name='backup' />
            </View>
            {/* {this.state.allowButtonPress ? <FormLabel>da</FormLabel> : <FormLabel>ne</FormLabel>} */}
            {this.state.showLoading ? <View><ActivityIndicator animating={true} style={styles.centering} size="small" /><FormLabel>Nalagam: {this.state.currentLoading}</FormLabel></View> : null}
            {this.state.successUpload ? <View><Icon color='#2980b9' name='done-all' /><FormLabel>Podatki so uspešno naloženi.</FormLabel></View> : null}
            <View>
              <Icon onPress={this.state.allowButtonPress ? this._onButtonPressReset.bind(this): null}  raised color='#34495e' name='update' />
            </View>
          </View>
        </View>
        <ScrollView style={{flex:1, position:'absolute', bottom:60, width:"100%", top: 180}}>
          {this.state.values == this.state.ds ? <List><ListItem key={1} title="Ni lokalnih podatkov" leftIcon={{name:"chat-bubble-outline"}}/></List> : null }
          {this.state.values != this.state.ds ? <List><ListView renderRow={this.renderRow.bind(this)} dataSource={this.state.values}  /></List> : null }
        </ScrollView>
        <View style={{flexDirection:'row',position:'absolute', bottom:0,right:5}}>
          <Icon onPress={this.state.allowButtonPress ? this._onButtonPressAddNewElement.bind(this) : null} raised color='#2980b9' name='note-add' />
        </View>

        <View style={{marginTop: 0}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.setModalVisible.bind(this,false)}
            >
              <View style={{marginTop: 22}}>
                <ScrollView>
                  <FormLabel>Generiran kljuc:</FormLabel>
                  <Button style={{marginTop:20}}  small backgroundColor='#2980b9' icon={{name: 'report'}} title={this.state.modalData.generatedKey} />
                  <FormLabel>Datum vzorčenja</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.datumVzorcenja}</Text>
                  <FormLabel>Globina</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.globina != "" ? this.state.modalData.globina : "/"}</Text>
                  <FormLabel>Za obdelavo</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.jeZaObdelavo ? "Da" : "Ne"}</Text>
                  <FormLabel>Povrsina</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.povrsina != "" ? this.state.modalData.povrsina : "/"}</Text>
                  <FormLabel>GPS lokacija</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.lokacija != "" ? this.state.modalData.lokacija : "/"}</Text>

                  <FormLabel>Ročna lokacija</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.rocnaLokacija == "" ||  this.state.modalData.rocnaLokacija == null ? "/" : this.state.modalData.rocnaLokacija}</Text>

                  <FormLabel>Tip pridelka</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.tipPridelka != "" ? this.state.modalData.tipPridelka : "/"}</Text>

                  <FormLabel>Rastlinjak</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.rastlinjak != "" ? this.state.modalData.rastlinjak : "/"}</Text>

                  <FormLabel>Starost pridelka</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.starostPridelka != "" ? this.state.modalData.starostPridelka : "/"}</Text>

                  <FormLabel>Predhodna gnojenje</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.predhodnaGnojenje != "" ? this.state.modalData.predhodnaGnojenje : "/"}</Text>

                  <FormLabel>Pred enim letom</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.predEnimLetom != "" ? this.state.modalData.predEnimLetom : "/"}</Text>

                  <FormLabel>Ostali organski materiali</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.ostaliOrganskiMateriali != "" ? this.state.modalData.ostaliOrganskiMateriali : "/"}</Text>

                  <FormLabel style={{marginBottom:20}}>Slika</FormLabel>
                  {/* <Text style={styles.modalText}>{this.state.modalData.image ? this.state.modalData.image.uri : "/"}</Text> */}
                  {this.state.modalData.image != null && this.state.modalData.image.uri != null ? <Image source={this.state.modalData.image} style={styles.uploadedImage} /> : <Text style={styles.modalText}>/</Text> }

                  <FormLabel>Dodatne informacije</FormLabel>
                  <Text style={styles.modalText}>{this.state.modalData.dodatneInformacije != "" ? this.state.modalData.dodatneInformacije : "/"}</Text>
                  <FormLabel></FormLabel>

                  <FormLabel labelStyle={{color:'#2980b9',textAlign:'center',flex:1}}>Testne informacije iz laboratirija! Obvezno shraniti podatke preden se stvari prenesejo na server. Vnosna polja so lahko tudi prazna ampka za prenos podatkov na strežnik je potrebno klikniti gumb shrani. Neposlane vzorce lahko urejate v primeru, da ste se zmotili.</FormLabel>


                  <FormLabel>n v mg/kg</FormLabel>
                  <FormInput placeholderTextColor="#bebebe" placeholder="mg/kg" onChangeText={(n) => this.setState({ modalData1n : n})} value={this.state.modalData1n}/>

                  <FormLabel>p v mg/kg</FormLabel>
                  <FormInput placeholderTextColor="#bebebe" placeholder="mg/kg" onChangeText={(p) => this.setState({ modalData1p : p})} value={this.state.modalData1p}/>

                  <FormLabel>k v mg/kg</FormLabel>
                  <FormInput placeholderTextColor="#bebebe" placeholder="mg/kg" onChangeText={(k) => this.setState({ modalData1k : k})} value={this.state.modalData1k}/>

                  <FormLabel>ph</FormLabel>
                  <FormInput placeholderTextColor="#bebebe" placeholder="ph vrednost" onChangeText={(ph) => this.setState({ modalData1ph : ph})} value={this.state.modalData1ph}/>

                  <FormLabel>Organska snov</FormLabel>
                  <FormInput placeholderTextColor="#bebebe" placeholder="snov" onChangeText={(organskaSnov) => this.setState({ modalData1organskaSnov : organskaSnov})} value={this.state.modalData1organskaSnov}/>
                  <Button style={{marginTop:20}} onPress={this._onButtonPressSave.bind(this,this.state.modalData)} large backgroundColor='#2980b9' icon={{name: 'archive'}} title='SHRANI LABORATORIJSKE SPREMEMBE' />
                  <FormLabel></FormLabel>
                  <FormLabel></FormLabel>
                  <FormLabel></FormLabel>

                  <Button large backgroundColor='#e74c3c' onPress={() => {this.setModalInvisible(!this.state.modalVisible)}} title="Zapri" />
                  <FormLabel></FormLabel>
                </ScrollView>
              </View>
            </Modal>
          </View>
        </View>

      );
    }
  }
  const styles = StyleSheet.create({
    centering: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    uploadedImage:{
      flex: 1,
      width: "100%",
      height: 200,
      resizeMode: 'contain',
      marginBottom:20
    },
    modalText:{
      color: '#2980b9',
      marginLeft:20
    }
  });
