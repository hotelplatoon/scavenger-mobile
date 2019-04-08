import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

export default class ExitButton extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          {/* Button to navigate to new hunt */}
          <TouchableOpacity
            style={styles.startGameButton}
            // onPress={() => {
            //   WebBrowser.openBrowserAsync('https://expo.io');
            // }}
            // onPress={() => navigate('Clue', {name: 'Jane'})}
            underlayColor='#fff'>
            <Text style={styles.startGameText}>START NEW HUNT</Text>
          </TouchableOpacity>
{/*           
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity> */}

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
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  subTitleText: {
    fontSize: 18,
    color: '#4c0a01',
    // lineHeight: 30,
    textAlign: 'center',
    fontWeight: "500",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 20,
    marginBottom : 20,
  },
  clueText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
