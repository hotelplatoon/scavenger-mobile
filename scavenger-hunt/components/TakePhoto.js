import React from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import { ImagePicker, Constants } from 'expo';
import { Permissions } from 'expo';

export default class TakePhoto extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    const hasCameraPermission = (camera.status === 'granted'); 
    this.setState({ hasCameraPermission });
  };

  _pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({  //For grabbing image from camera roll
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
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
