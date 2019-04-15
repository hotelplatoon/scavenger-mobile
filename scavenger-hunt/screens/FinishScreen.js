import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
}
from 'react-native';
import { Card } from "react-native-elements";
import { USER_KEY } from '../auth'
import style from '../constants/Style'

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_name : globalState.name,
      modalVisible: false
    }}

  sentenceCase(str) {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

  getClueList() {
    let clues = this.props.navigation.getParam('clues', 'NO_CATEGORY')
    let clueText = []
    for (let i = 0; i < clues.length; i++) {
      clueText.push(<View key={i} style={styles.clueContainer}>
        <Text style={style.bodyText}>{(i+1)+ (". ") + this.sentenceCase(clues[i].clue)}
        </Text>
      </View>)
    }
    return clueText
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={style.bodyText}>
          Congratulations {this.state.user_name}!
        </Text>
      </View>
      <View style={styles.finishCategoryContainer}>
        <Text style={style.subTitleText}>You have completed the hunt for </Text>
        <Text style={style.screenTitleText}>{this.props.navigation.getParam('huntCategory')}</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.clueContainer}>
          <Card style={style.screenTitleText} title='You found the following clues!'>
            <View>
              {this.getClueList()}
            </View>
          </Card>
        </View>

        </ScrollView>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigate('Main', {checkpoint_number: 0} )}
          underlayColor='#fff'
          >
          <Text style={style.buttonText}>
            HOME
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 50
  },
  finishCategoryContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 30,
    marginBottom: 15,
  },
  clueContainer: {
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 5,
  }
})
