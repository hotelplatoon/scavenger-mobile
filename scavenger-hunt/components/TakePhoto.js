
import React from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import { ImagePicker, Constants } from 'expo';
import { Permissions } from 'expo';
import GoogleVisionAPI from "../api/GoogleVisionAPI"

export default class TakePhoto extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    encodedImage : null,
    checkpoint_name : this.props.navigation.getParam('checkpoint_name', "NO_CHECKPOINT_NAME")  // Grabbing the checkpoint name to compare against, must provide a default variable "NO_CHECKPOINT_NAME" incase nothing is passed down
  };


  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted'); 
    this.setState({ hasCameraPermission });
    console.log(`\n21: Checkpoint "${this.state.checkpoint_name}" passed from ClueScreen`) 
    
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
    console.log(this.state.encodedImage)
  }
  
  handleAnalyzePhoto = () => {
    console.log("Analyzing....")
    GoogleVisionAPI.analyzeImage(this.state.encodedImage)
      .then((JSONresponse) => { 
        console.log("=========================")
        if (!JSONresponse.responses[0].landmarkAnnotations) {
          console.log("48: Your image could not be successfully analyzed")
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
    // console.log(`65: ${this.state.checkpoint_name}`) 
    if (detectedLandmarks.includes(this.state.checkpoint_name) ){
      console.log(`67: SUCCESS! Your photo matches!`) 
    }
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Take Photo" onPress={this._pickImage.bind(this)}>
          <Text>Open Camera</Text>
        </Button>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="ANALYZE" onPress={this.handleAnalyzePhoto}>
          <Text>Analyze</Text>
        </Button>
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
});