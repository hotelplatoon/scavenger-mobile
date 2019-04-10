
import React from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { ImagePicker, Constants } from 'expo';
import { Permissions } from 'expo';
import GoogleVisionAPI from "../api/GoogleVisionAPI"
import { Overlay, withTheme } from 'react-native-elements';


export default class TakePhoto extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    encodedImage : null,
    checkpoint_name : this.props.navigation.getParam('checkpoint_name', "NO_CHECKPOINT_NAME"),  // Grabbing the checkpoint name to compare against, must provide a default variable "NO_CHECKPOINT_NAME" incase nothing is passed down
    checkpoint_number: this.props.navigation.getParam('checkpoint_number', "NO_CHECKPOINT_NUMBER"),
    isFailMessageVisible : false
  };


  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted'); 
    this.setState({ hasCameraPermission });
    console.log(`\n24: Checkpoint "${this.state.checkpoint_name}" passed from ClueScreen`) 
  };

  _pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({  //For grabbing image from camera roll
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    });
    // console.log(result);
    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
        encodedImage : result.base64
      });
    }
    // console.log(this.state.encodedImage)
  }
  
  handleAnalyzePhoto = () => {
    console.log("Analyzing....")
    GoogleVisionAPI.analyzeImage(this.state.encodedImage)
      .then((JSONresponse) => { 
        console.log("=========================")
        if (!JSONresponse.responses[0].landmarkAnnotations) {
          console.log("50: Your image could not be successfully analyzed")
          this.setState({
            isFailMessageVisible : true
          })
          // User notified and take new photo
        } else {
          let detectedLandmarks = []
          for (landmark of JSONresponse.responses[0].landmarkAnnotations) {      
            detectedLandmarks.push(landmark.description)
          }
          console.log(detectedLandmarks)
          this.isMatchingPhoto(detectedLandmarks)
          // If successful send image to S3 Bucket!
        } 
      })
      .catch((error) => {
        console.log(error)
      })
  }

  isMatchingPhoto = (detectedLandmarks) => {
    if (detectedLandmarks.includes(this.state.checkpoint_name) ){
      console.log(`72: SUCCESS! Your photo matches!`)
      this.setState({
        // isMatchedPhoto : true
        checkpoint_number: this.state.checkpoint_number + 1
      })
      this.props.navigation.navigate('Clue', {checkpoint_number: this.state.checkpoint_number})
    }
  }

  setModalVisible(visible) {
    this.setState({
      isFailMessageVisible: visible,
      image: null,
      encodedImage: null
    });
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        { this.state.isFailMessageVisible 
          ?
            <Overlay
              isVisible={this.state.isFailMessageVisible}
              windowBackgroundColor="rgba(200, 200, 200, .5)"
              overlayBackgroundColor="rgba(255, 255, 255, .8)"
              width="80%"
              height="50%"
              // onBackdropPress={() => this.setState({ isVisible: false })}
            >
            <View style={styles.overlayMessage}>
              <Text>Your photo does not match the checkpoint</Text>
              <TouchableHighlight 
                style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.isFailMessageVisible);
                }}>
                <Text style={styles.buttonText}>TRY AGAIN</Text>
              </TouchableHighlight>
              </View>
            </Overlay> 
          : null }

        {!image &&
        <Button title="Take Photo" onPress={this._pickImage.bind(this)}>
          <Text>Open Camera</Text>
        </Button>}

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        
        {image &&
        <Button title="ANALYZE" onPress={this.handleAnalyzePhoto}>
          <Text >Analyze</Text>
        </Button>}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  overlayMessage: {
    marginTop:'40%',
    alignItems: 'center',
  },
  button: {
    paddingTop:20,
    margin: 10,
    paddingBottom:20,
    backgroundColor:'#4c0a01',
    borderRadius:5,
  },
  buttonText:{
    color:'#fff',
    fontSize: 20,
    fontWeight: "700",
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
});