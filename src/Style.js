import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  rootContainer: {
    flex: 1
  },

  displayContainer: {
    flex: 2,
    backgroundColor: '#193441'
  },

  inputContainer: {
    flex: 8,
    backgroundColor: '#3E606F'
  },
  flyingButton : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#91AA9D'
  },

  inputButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  },
  displayContainer: {
    flex: 2,
    backgroundColor: '#193441',
    justifyContent: 'center'
  },

  displayText: {
    // color: 'white',
    // fontSize: 38,
    // fontWeight: 'bold',
    // // textAlign: 'right',
    // padding: 20
  },
});

export default Style;
