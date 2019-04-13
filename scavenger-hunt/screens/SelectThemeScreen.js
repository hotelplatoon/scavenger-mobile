import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import ImagesDjangoAPI from '../api/ImagesDjangoAPI';


export default class SelectThemeScreen extends React.Component {
    static navigationOptions = {
    title: 'Choose a Hunt',
  };
  constructor(props){
    super(props);
    this.state = {
      huntThemes : [],
      selectedHuntID: 0
    }}
    

  async componentDidMount() {
    let huntThemes = []
    await ImagesDjangoAPI.fetchHuntThemes() 
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
          huntThemes.push(element)
        }
        this.setState({
          huntThemes: huntThemes
        })
        console.log(huntThemes)
    })
    .catch((error) => {
      console.log(error)
    })
    let selectedHunt=this.props.navigation.getParam('selectedHuntID')
    this.setState({
      selectedHuntID: selectedHunt
    })
  }

  createThemeButtons() {
    return this.state.huntThemes.map(( huntTheme, index ) =>
      <View key={index} 
      style={{margin: 6}}
      >
        <Button
          title={huntTheme.category}
          type="outline"
          raised={true}
          style={{width: 100}}
          onPress={() => this.props.navigation.navigate('Clue', {selectedHuntID: huntTheme.pk, selectedHuntCategory: huntTheme.category, checkpoint_number: 0} )}
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
            { this.state.huntThemes && this.createThemeButtons() }
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
