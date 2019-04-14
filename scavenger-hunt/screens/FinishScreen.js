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
}
from 'react-native';
import { Card } from "react-native-elements";
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { USER_KEY } from '../auth'
import style from '../constants/Style'


export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_name : "Jon",
      modalVisible: false
    }}

  sentenceCase(str) {
      if ((str===null) || (str===''))
           return false;
      else
       str = str.toString();
    
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

  getClueList() {
    let clues = this.props.navigation.getParam('clues', 'NO_CATEGORY')
    let clueText=[]
    for (let i = 0; i < clues.length; i++) {
      clueText.push(<View key={i} style={styles.clueContainer}>
        <Text style={styles.subTitleText}>{(i+1)+ (". ") + this.sentenceCase(clues[i].clue)}
        </Text>
      </View>)
    }
    return clueText
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      { console.log(`30: hello`) }
      <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Congratulations {this.state.user_name}!</Text>
      </View>
      <View style={styles.finishCategoryContainer}>
        <Text style={styles.subTitleText}>You have completed the hunt for </Text>
        <Text style={styles.titleText}>{this.props.navigation.getParam('huntCategory')}</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Card style={style.screenTitleText} title='You found the following clues!'>
          <View>
            {/* <Text style={{ color: "#4c0a01", fontSize: 18 }}>You found the following clues:</Text> */}
            {this.getClueList()}
          </View>
        </Card>

              {/* <Text style={styles.subTitleText}>You found the following clues:</Text> */}
              {/* {this.getClueList()} */}


        </ScrollView>
        <TouchableOpacity
          style={styles.finishGameButton}
          onPress={() => navigate('Main', {checkpoint_number: 0}, {name: 'Jane'})}
          underlayColor='#fff'>
          <Text style={styles.startGameText}>Home</Text>
        </TouchableOpacity>
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
    marginHorizontal: 50,
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
    marginTop: 50,
  },
  finishCategoryContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 30,
    marginBottom: 15,
  },
  clueContainer: {
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 5,
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
    // paddingTop : 15,
    // paddingBottom: 15,
  },
  titleText: {
    fontSize: 30,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 15,
    paddingBottom : 15
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
  finishGameButton:{
    marginRight:70,
    marginLeft:70,
    marginTop:20,
    marginBottom:20,
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