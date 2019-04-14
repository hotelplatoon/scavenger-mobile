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
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { USER_KEY } from '../auth'
import { StoreGlobal } from '../App'
import style from '../constants/Style'
import { Button, Icon } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_name : globalState.name,
      modalVisible: false
    }}

    _checkAsync = async () => {
      let value = await AsyncStorage.getItem('USER_KEY')
      console.log(value, 'value')
    }
    _globalState = () => {StoreGlobal({type:'get', key:'name'})}

  render() {
    console.log(this.props.navigation.getParam('passedName', 'no name'))
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      {/* { console.log(`30: hello`) } */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={style.bodyText}>Hello {(globalState.name)}!</Text>
          </View>
            <Text style={style.upperSubTitleText} >Welcome to</Text>
            <Text style={style.screenTitleText}>THE HUNT</Text>


          <TouchableOpacity
            style={style.button}
            onPress={() => navigate('SelectTheme')}
            underlayColor='#fff'
            >
            <Text style={style.buttonText}>START NEW HUNT</Text>
          </TouchableOpacity>
        
        <View style={style.buttonContainer}>
          <Button
              buttonStyle={{
                height: 60,
                width: 160,
                borderWidth: 1,
                borderColor: '#4c0a01'
              }}
              titleStyle={{
                color: '#4c0a01',
                fontSize: 20
              }}
              title="View Gallery"
              type="outline"
              raised={true}
              onPress={() => navigate('Gallery')}
            />
          </View>

          {/* <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Async Test"
        onPress={() => this._checkAsync()}
        /> */}
          </ScrollView>

          <View style={{marginTop: 1}}>
            <Modal 
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{margin: 35}}>
                <View style={style.modalContainer}>
                    <View style={{ alignSelf: 'flex-end' }}>
                      <Icon
                        name="closecircleo"
                        type="antdesign"
                        size={25}
                        color="white"
                        onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                      />
                    </View>
                  <View style={{padding: 30 }}>
                    <Text style={style.modalTitleText}>HOW TO PLAY</Text>
                    <Text style={style.modalBodyText}>_______</Text>
                    <Text style={style.modalBodyText}>{"\n"}You will be shown clues to help you discover 5 checkpoints. To prove you found each checkpoint, snap a photo and submit it for analysis!</Text>
                    <Text style={style.modalBodyText}>_______</Text>
                    <Text style={style.modalTitleText}>{"\n\n\n"}Good Luck!</Text>
                  </View>
                </View>
              </View>
            </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={style.subTitleText}>How to play</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
  },
  // welcomeImage: {
  //   width: 100,
  //   height: 80,
  //   resizeMode: 'contain',
  //   marginTop: 3,
  //   marginLeft: -10,
  // },
  welcomeContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 80
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  }
})
