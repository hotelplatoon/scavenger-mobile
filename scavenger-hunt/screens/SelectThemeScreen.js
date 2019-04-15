import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import HuntAPI from '../api/HuntAPI';
import style from '../constants/Style'

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
    
  componentDidMount() {
    let huntThemes = []
    HuntAPI.fetchHuntThemes() 
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
          huntThemes.push(element)
        }
        this.setState({
          huntThemes: huntThemes
        })
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
      <View key={index}>
        <TouchableOpacity
          style={style.huntButton}
          underlayColor='#fff'
          onPress={() => this.props.navigation.navigate('Clue', { selectedHuntID: huntTheme.pk,
            selectedHuntCategory: huntTheme.category, 
            checkpoint_number: 0
          })}
        >          
          <Text style={style.buttonText}>{huntTheme.category}</Text>
        </TouchableOpacity>
      </View>
      )
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={style.contentContainer}>
          <Text style={style.screenTitleText}>Choose a Theme</Text>
          <View       
          style={{margin: 6,
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'flex-start'}}
          >
            { this.state.huntThemes && this.createThemeButtons() }
          </View>
          <View style={styles.container}>
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
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center'
  },
});
