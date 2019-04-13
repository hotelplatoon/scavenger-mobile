import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import S3ImagesAPI from '../api/S3ImagesAPI';
import ImagesDjangoAPI from '../api/ImagesDjangoAPI';


export default class GalleryScreen extends React.Component {
    static navigationOptions = {
    title: 'Gallery',
  };
  constructor(props){
    super(props);
    this.state = {
      images : null,
      imageURLs : []
    }}

  async componentDidMount() {
    let imageNames = []
    let imageURLs = []
    await ImagesDjangoAPI.fetchImages() 
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
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
    return this.state.imageURLs.map(( imageURL, index ) =>
      <View key={index} >
        <Image 
          style={{width: 155, height: 155, margin: 6, borderRadius: 2}}
          source={{uri: imageURL}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      )
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.titleText}>Checkpoint Photos</Text>
          <View style={styles.container}>

            { this.state.imageURLs && this.createImages() }
          </View>
          <View style={styles.container}>
            <Button
              title="Go back"
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
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  titleText: {
    fontSize: 30,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
  },
});