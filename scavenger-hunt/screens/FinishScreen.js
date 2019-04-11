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
import { MonoText } from '../components/StyledText';
import { USER_KEY } from '../auth'
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_name : "Jon",
      modalVisible: false
    }}

    _checkAsync = async () => {
      let value = await AsyncStorage.getItem('USER_KEY')
      console.log(value)
    }

  render() {
    

    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

      { console.log(`30: hello`) }

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Hello {this.state.user_name}!</Text>
            <Text style={styles.subTitleText}>Welcome to</Text>
            <Text style={styles.titleText}>THE HUNT</Text>
          </View>

          {/* Button to navigate to new hunt */}
          <TouchableOpacity
            style={styles.startGameButton}
            // onPress={() => {
            //   WebBrowser.openBrowserAsync('https://expo.io');
            // }}
            onPress={() => navigate('Clue', {name: 'Jane'})}

            underlayColor='#fff'>
            <Text style={styles.startGameText}>START NEW HUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.startGameButton}
            onPress={() => navigate('Gallery')}
            underlayColor='#fff'>
            <Text style={styles.startGameText}>View Gallery</Text>
          </TouchableOpacity>
          <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Async Test"
        onPress={() => this._checkAsync()}
        />
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
                <Text style={styles.subTitleText}>How to play THE HUNT</Text>
                <Text style={styles.getStartedText}>You will be shown clues to help you locate 5 checkpoints. To prove you found each checkpoint, snap a photo for analysis!</Text>
                <Text style={styles.getStartedText}>{"\n"}Good Luck!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.subTitleText} >Hide</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.subTitleText}>How to play</Text>
          </TouchableHighlight>
        </View>



      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  titleText: {
    fontSize: 30,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
    // paddingTop : 10
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
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  startGameButton:{
    marginRight:70,
    marginLeft:70,
    marginTop:20,
    paddingTop:30,
    paddingBottom:30,
    backgroundColor:'#4c0a01',
    borderRadius:5,
  },
  startGameText:{
      color:'#fff',
      fontSize: 25,
      fontWeight: "900",
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  howToModal: {
    marginTop:'80%',
    borderWidth: 5,
    borderColor: '#4c0a01'
  }
})


// <<<<<<< HEAD
// import React from "react";
// import { ScrollView, Text, Linking, View } from "react-native";
// import { Card, Button } from "react-native-elements";

// const images = [
//   {
//     key: 1,
//     name: "Nathan Anderson",
//     image: require("../images/1.jpg"),
//     url: "https://unsplash.com/photos/C9t94JC4_L8"
//   },
//   {
//     key: 2,
//     name: "Jamison McAndie",
//     image: require("../images/2.jpg"),
//     url: "https://unsplash.com/photos/waZEHLRP98s"
//   },
//   {
//     key: 3,
//     name: "Alberto Restifo",
//     image: require("../images/3.jpg"),
//     url: "https://unsplash.com/photos/cFplR9ZGnAk"
//   },
//   {
//     key: 4,
//     name: "John Towner",
//     image: require("../images/4.jpg"),
//     url: "https://unsplash.com/photos/89PFnHKg8HE"

// export default () => (
//   <View style={{ flex: 1 }}>
//     <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
//       {images.map(({ name, image, url, key }) => (
//         <Card title={`CARD ${key}`} image={image} key={key}>
//           <Text style={{ marginBottom: 10 }}>
//             Photo by {name}.
//           </Text>
//           <Button
//             backgroundColor="#03A9F4"
//             title="VIEW NOW"
//             onPress={() => Linking.openURL(url)}
//           />
//         </Card>
//       ))}
//     </ScrollView>
//   </View>
// );