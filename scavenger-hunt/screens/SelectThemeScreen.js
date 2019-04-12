import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import S3ImagesAPI from '../api/S3ImagesAPI';
import ImagesDjangoAPI from '../api/ImagesDjangoAPI';


export default class SelectThemeScreen extends React.Component {
    static navigationOptions = {
    title: 'Choose a Hunt',
  };
  constructor(props){
    super(props);
    this.state = {
      huntThemes : []
    }}
    // Maybe only get the urls of images, whose user_hunt_id matches whats in state

  async componentDidMount() {
    let huntThemes = []
    await ImagesDjangoAPI.fetchHuntThemes()  // Grab all imagenames from DB
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
          huntThemes.push(element.category)
        }
      this.setState({
        huntThemes: huntThemes
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createThemeButtons() {
    return this.state.huntThemes.map(( huntTheme, index ) =>
      <View key={index} >
            <Button
              title={huntTheme}
              type="outline"
              raised={true}
              onPress={() => this.props.navigation.navigate('Main')}
            />
      </View>
      )
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.titleText}>Choose a Theme</Text>
          <View style={styles.container}>

            { this.state.imageURLs && this.createThemeButtons() }
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
