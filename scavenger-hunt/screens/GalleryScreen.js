import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';

// import testImage from '../api/testImage.json'
import S3ImagesAPI from '../api/S3ImagesAPI';


export default class GalleryScreen extends React.Component {
    static navigationOptions = {
    title: 'Gallery',
  };
  constructor(props){
    super(props);
    this.state = {
      imageURL : null
    }}

  async componentDidMount() {
    let url = await S3ImagesAPI.s3.getSignedUrl('getObject', {
      Bucket: "guess-who-images",
      Key: "fre7MpG4lQV9",
      Expires: 1800
    });
    console.log(url)
    this.setState({
      imageURL: url
    })
  }

  render() {
    // { console.log(`22: ${testImage}`) }
    { console.log(`22: ${this.state.imageURL}`) }

    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>

            {/* <Image 
              style={{width: 66, height: 58}}
              source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
            />
            <Image 
              style={{width: 200, height: 200}}
              source={{uri: `data:image/png;base64,${testImage}`}}
            /> */}
            {/* <Image 
              style={{width: 200, height: 200}}
              source={{uri: `data:image/png;base64,${this.state.imageURL}`}}
            /> */}

            { this.state.imageURL && 
            <Image 
              style={{width: 200, height: 200}}
              source={{uri: this.state.imageURL}}
            /> }

            <Button
              title="Go back"
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
});
