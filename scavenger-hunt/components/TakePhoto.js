import { RNS3 } from 'react-native-aws3';
import React from 'react';
import { Image, View, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ImagePicker, Constants, Permissions } from 'expo';
import GoogleVisionAPI from "../api/GoogleVisionAPI"
import { Overlay, Button, Icon } from 'react-native-elements';
import ImagesDjangoAPI from '../api/ImagesDjangoAPI';
import style from '../constants/Style'

export default class TakePhoto extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    encodedImage : null,
    checkpoint_name : "",
    checkpoint_number : 0,
    isFailMessageVisible : false,
    isMatchedPhoto: false,
  };

  async componentDidMount() {
    const checkpoint_name = this.props.navigation.getParam('checkpoint_name', "NO_CHECKPOINT_NAME")
    const camera = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted'); 
    this.setState({ hasCameraPermission, checkpoint_name });
  };

  componentDidUpdate(){
    const clueIndex = this.props.navigation.getParam('checkpoint_number', 0)
    const checkpoint_name = this.props.navigation.getParam('checkpoint_name', "NO_CHECKPOINT_NAME")
    if ((this.state.checkpoint_number != clueIndex) || (this.props.navigation.getParam('checkpoint_name') != this.state.checkpoint_name)) {
      this.setState({
        ...this.state, 
        checkpoint_number: clueIndex, 
        checkpoint_name: checkpoint_name
      })
    }
  }

  _pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
        encodedImage : result.base64
      });
    }
  }

  _pickImageCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
        encodedImage : result.base64
      });
    }
  }

  generateUniqueImageName = () => {
    var uniqueString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
      uniqueString += possible.charAt(Math.floor(Math.random() * possible.length));
    return uniqueString;
  }
  
  handleAnalyzePhoto = () => {
    console.log("Analyzing....")
    GoogleVisionAPI.analyzeImage(this.state.encodedImage)
      .then((JSONresponse) => { 
        let huntCategory = this.props.navigation.getParam('huntCategory', 'NO_CATEGORY')
        if (huntCategory === "Landmarks") {
          if (!JSONresponse.responses[0].landmarkAnnotations) {
            console.log("85: Your image could not be successfully analyzed")
            this.setState({
              isFailMessageVisible : true,
              isMatchedPhoto: false
            })
          } else {
            let detectedLandmarks = []
            for (landmark of JSONresponse.responses[0].landmarkAnnotations) {      
              detectedLandmarks.push((landmark.description))
            }
            this.isMatchingPhoto(detectedLandmarks)
          }
        } else if (huntCategory === "Things & Stuff!") {
          if (!JSONresponse.responses[0].labelAnnotations) {
            console.log("99: Your image could not be successfully analyzed")
            this.setState({
              isFailMessageVisible : true,
              isMatchedPhoto: false
            })
          } else {
            let detectedLabels = []
            for (label of JSONresponse.responses[0].labelAnnotations) {      
              detectedLabels.push((label.description))
            }
            this.isMatchingPhoto(detectedLabels)
          }
        }
      })
    .catch((error) => {
      console.log(error)
    })
  }

  isMatchingPhoto = (detectedLabels) => {
    let checkpoint_name = this.state.checkpoint_name
    for (let i = 0; i < detectedLabels.length; i++) {
      if (detectedLabels[i] === checkpoint_name) {
        let fileName = this.generateUniqueImageName()
        let file = {
          uri: this.state.image,
          name: fileName,
          type: "image/png"
        }
        const options = {
          bucket: "scavenger-bucket",
          region: "us-east-2",
          accessKey: Constants.manifest.extra.S3_API_KEY_ID,
          secretKey: Constants.manifest.extra.S3_SECRET_ACCESS_KEY,
          successActionStatus: 201
        }
        RNS3.put(file, options).then(response => {
          if (response.status !== 201) {
            throw new Error("Failed to upload image to S3");
          } else {
            this.savePhotoToDB(fileName)
          }
        });
        break
      } else {
        this.setState({
          isMatchedPhoto : false,
          isFailMessageVisible : true
        })
      }
    }
  }
  
  savePhotoToDB = (fileName) => {
    let imageObject = {
      "image_name": fileName,
      "user_hunt_id": 1,
      "checkpoint_id": (this.state.checkpoint_number + 1)
    }
    ImagesDjangoAPI.addImage(imageObject)
      .then((response) => {
        if (response.status === 201) {
          // console.log(response)
        } else {
          console.log(response)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      this.setState({
        isMatchedPhoto : true,
        isFailMessageVisible : false
      })   
    }

  setModalVisible(visible) {
    this.setState({
      isFailMessageVisible: visible,
      image: null,
      encodedImage: null
    });
  }

  clearOverlay= () => {
    const finalCheckpoint = this.props.navigation.getParam('finalCheckpoint', 4)
    this.setState({
      isMatchedPhoto: false,
      image: null,
      encodedImage: null,
    })
    if (this.state.checkpoint_number === finalCheckpoint) {
      this.props.navigation.navigate('Finish', {checkpoint_number: 0})
    }
    else {
      this.props.navigation.navigate('Clue', {checkpoint_number: this.state.checkpoint_number + 1})
    }
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        { this.state.isFailMessageVisible 
          ?
            <Overlay
              overlayStyle={styles.overlayContainer}
              isVisible={this.state.isFailMessageVisible}
              windowBackgroundColor="rgba(200, 200, 200, .5)"
              overlayBackgroundColor="rgba(255, 255, 255, .9)"
              width="80%"
              height="35%"
            >
            <View style={styles.overlayMessage}>
              <Icon
                name='frown-o'
                type='font-awesome'
                color='#4c0a01'
                size={70}
              />
              <Text style={{paddingVertical: 10 }}>Your photo does not match the checkpoint</Text>
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

        { this.state.isMatchedPhoto 
          ?
            <Overlay
              overlayStyle={styles.overlayContainer}
              isVisible={true}
              windowBackgroundColor="rgba(200, 200, 200, .5)"
              overlayBackgroundColor="rgba(255, 255, 255, .9)"
              width="80%"
              height="35%"
            >
            <View style={styles.overlayMessage}>
            <Icon
                name='smile-o'
                type='font-awesome'
                color='#4c0a01'
                size={70}
              />
              <Text style={{paddingVertical: 10 }}>Woohoo! You found it - nice work!</Text>
              <TouchableHighlight 
                style={styles.button}
                onPress={() => this.clearOverlay()}
                >
                <Text style={styles.buttonText}>NEXT CHECKPOINT</Text>
              </TouchableHighlight>
              </View>
            </Overlay> 
          : null }

        {!image &&   
          <View>
            <Text style={style.subTitleText}>
              Clue Reminder
            </Text>
            <View style={styles.textContainer}>
            <Text style={style.bodyText}>
              {this.props.navigation.getParam('checkpoint_description')}
            </Text>
            </View>
          </View>
        }

        {!image &&
          <TouchableOpacity
            style={style.button}
            underlayColor='#fff'
            onPress={this._pickImageCamera.bind(this)}
          >          
            <Text style={style.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        }

        {!image &&
          <Button
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#4c0a01'
            }}
            titleStyle={{
              color: '#4c0a01',
              fontSize: 16
            }}
            title="Open Camera Roll"
            type="outline"
            raised={true}
            onPress={this._pickImageCameraRoll.bind(this)}
          />
        }

        {image &&
          <View style={{backgroundColor: '#fff', borderRadius: 8, borderColor:'#4c0a01', borderWidth: 1}}>
            <Image 
              source={{ uri: image }} 
              style={{ width: 250,  
                height: 250,     
                borderRadius: 6, 
                margin: 8
              }} 
            />
          </View>
        }
        
        {image &&
          <TouchableOpacity
            style={style.button}
            underlayColor='#fff'
            onPress={this.handleAnalyzePhoto}
          >          
            <Text style={style.buttonText}>ANALYZE</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor:'#4c0a01',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  overlayContainer: {
    // borderColor: '#4c0a01',
    // borderWidth: 1,
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  textContainer: {
    marginHorizontal: 30,
    
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  overlayMessage: {
    marginVertical: 20,
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