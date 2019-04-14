import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import S3ImagesAPI from '../api/S3ImagesAPI';
import ImagesDjangoAPI from '../api/ImagesDjangoAPI';
import { testing } from './SignInScreen';
import { teststyles } from '../constants/Colors'
import style from '../constants/Style'

export default class GalleryScreen extends React.Component {
    static navigationOptions = {
    title: 'Gallery',
  };
  constructor(props){
    super(props);
    this.state = {
      user_id : 3,
      images : null,
      imageURLs : []
    }}

  async componentDidMount() {
    let imageNames = []
    let imageURLs = []
    await ImagesDjangoAPI.fetchImages() 
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
          if (element.user_hunt_id === this.state.user_id) {
            let imageObject = {
              user_hunt_id : element.user_hunt_id,
              image_name : element.image_name
            }
            imageNames.push({imageObject})
            let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
              Bucket: "scavenger-bucket",
              Key: element.image_name,
              Expires: 1800
            });
            imageURLs.push(url)
          }
        }
      this.setState({
        imageURLs: imageURLs,
        images: imageNames
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

    createImages() {
      let imagesList = []
      for (let i = 0; i < this.state.imageURLs.length; i += 2) {
        if (i === this.state.imageURLs.length - 1) {
          let imageRow = 
          <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Image 
            style={{width: 155, height: 155, margin: 6, borderRadius: 2, justifyContent: "flex-start"}}
            source={{uri: this.state.imageURLs[i]}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        imagesList.push(imageRow)
        }
        else {
        let imageRow = 
          <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Image 
              style={{width: 155, height: 155, margin: 6, borderRadius: 2}}
              source={{uri: this.state.imageURLs[i]}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Image 
              style={{width: 155, height: 155, margin: 6, borderRadius: 2}}
              source={{uri: this.state.imageURLs[i + 1]}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          imagesList.push(imageRow)
        }
      }
      return imagesList
    }

  render() {
    return (
      // <View style={style.pageContainer}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={style.contentContainer}>
          <Text style={style.screenTitleText}>Checkpoint Photos</Text>
          <View style={styles.container}>
            { this.state.imageURLs && this.createImages() }
          </View>
          <View style={style.buttonContainer}>
            <Button
              buttonStyle={{
                height: 50,
                width: 100,
                borderWidth: 1,
                borderColor: '#4c0a01'
              }}
              titleStyle={{
                color: '#4c0a01',
                fontSize: 20
              }}
              title="Back"
              type="outline"
              raised={true}
              onPress={() => this.props.navigation.navigate('Main')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    // flexDirection: 'row',
    justifyContent: 'center'
  },
  // buttonContainer: {
  //   flex: 1,
  //   paddingTop: 15,
  //   backgroundColor: '#fff',
  //   flexDirection: 'row',
  //   justifyContent: 'center'
  // },
});