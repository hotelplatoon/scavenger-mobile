import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

export default class ClueText extends React.Component {
  // static navigationOptions = {
  //   title: 'Checkpoint',
  // };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
            <Text style={styles.subTitleText}>Here is your clue:</Text>

            <Text style={styles.clueText}>{this.props.clueText}</Text>
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
