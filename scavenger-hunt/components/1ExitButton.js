import { Constants } from 'expo';
import React from 'react';
import {
  Modal,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TouchableHighlight,
  Button,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from './StyledText';
import { USER_KEY } from '../auth'

export default class ExitButton extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    }}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.exitContainer}>
        
          {/* Button to navigate to new hunt */}
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              this.setModalVisible(true);
            }}>            
            <Text style={styles.subTitleText}>Exit</Text>
          </TouchableOpacity>

        </ScrollView>

        <View style={{marginTop: 22}}>
            <Modal 
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{margin: 30, padding: 10}}>
                <View style={styles.howToModal}>
                <Text style={styles.subTitleText}>Are your sure want to quit?</Text>
                <Text style={styles.exitText}>Warning! Data from this hunt session will not be saved.</Text>

                  <TouchableHighlight
                    style={styles.startGameButton}
                    onPress={() => navigate('Main', {checkpoint_number: 0}, {name: 'Jane'})}
                    underlayColor='#fff'>
                    <Text style={styles.subTitleText} >Quit</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                    <Text style={styles.subTitleText} >Continue</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  exitContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  exitButton:{
    marginRight:70,
    marginLeft:70,
    marginTop:5,
    paddingTop:5,
    paddingBottom:25,
    // backgroundColor:'#4c0a01',
    borderRadius:5,
  },
  exitText:{
      color:'#4c0a01',
      fontSize: 25,
      fontWeight: "900",
      textAlign:'right',
      paddingLeft : 10,
      paddingRight : 10
  },
    howToModal: {
    marginTop:'80%',
    borderWidth: 5,
    borderColor: '#4c0a01'
  },
    subTitleText: {
    fontSize: 18,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "500",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 30
  },
    exitText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
