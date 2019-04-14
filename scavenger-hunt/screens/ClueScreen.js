import React from 'react';
import {   Modal, TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Clue from '../components/Clue';
import HuntApi from '../api/HuntAPI'
import style from '../constants/Style'
import { Button } from 'react-native-elements';

export default class ClueScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clues: [],
      checkpoint_number: 0,
      description: "",
      checkpoint_name : "",
      checkpoint_amount: 5,
      clueText: "",
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.fetchClues()
  }

  componentDidUpdate() {
    const clueIndex = this.props.navigation.getParam('checkpoint_number', 0)
    clue = this.state.clues[clueIndex]
    const huntID = clue.hunt_id
    if (huntID != this.props.navigation.getParam('selectedHuntID')) {
      // this.fetchClues()
      this.componentDidMount()
    }
    if (clueIndex != this.state.checkpoint_number) {
      this.setState({
        ...this.state, checkpoint_number: clueIndex, checkpoint_name: clue.clue
      })
      }
    }

    exitHunt() {
      // this.setState({
      //   // clues: [],
      //   checkpoint_number: 0,
      //   description: "",
      //   checkpoint_name : "",
      //   checkpoint_amount: 5,
      //   clueText: "",
      //   // modalVisible: false
      // })
      {this.props.navigation.navigate('Main', {checkpoint_number: 0}, {name: 'Jane'}, {selectedHuntID: 0}, {checkpoint_name: ""})}
      {this.setModalVisible(!this.state.modalVisible)}
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={style.contentContainer}>

          <View style={style.container}>
            <Text style={style.upperSubTitleText}>
              {this.props.navigation.getParam('selectedHuntCategory', '')}
            </Text>
            <Text style={style.screenTitleText}>
              CHECKPOINT {this.state.checkpoint_number + 1}     
            </Text>
          </View>

          <View style={style.container}>
            {this.renderClue()}
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={this.goTakePhoto}
            underlayColor='#fff'
            >
            <Text style={styles.buttonTextLight}>FOUND IT?</Text>
            <Text style={styles.buttonText}>PROVE IT!</Text>
          </TouchableOpacity>

        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.exitContainer}>
            {/* <TouchableOpacity
              style={styles.exitButton}
              onPress={() => {
                this.setModalVisible(true);
              }}>            
              <Text style={style.subTitleText}>Exit</Text>
            </TouchableOpacity> */}
        <View style={style.buttonContainer}>
          <Button
              buttonStyle={{
                height: 40,
                // width: 160,
                borderWidth: 1,
                borderColor: '#4c0a01'
              }}
              titleStyle={{
                color: '#4c0a01',
                fontSize: 13
              }}
              title="Leave the hunt"
              type="outline"
              raised={true}
              onPress={() => {
                this.setModalVisible(true);
              }} 
            />
          </View>

          </ScrollView>

          <View style={{marginTop: 22}}>
              <Modal 
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{margin: 30, padding: 10}}>
                  <View style={styles.howToModal}>
                  <Text style={style.subTitleText}>Are your sure want to quit?</Text>
                  <Text style={styles.exitText}>Warning! Data from this hunt session will not be saved.</Text>

                    <TouchableHighlight
                      style={styles.startGameButton}
                      onPress={() => this.exitHunt()}
                      underlayColor='#fff'>
                      <Text style={style.subTitleText}>Quit</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                      <Text style={style.subTitleText} >Continue</Text>
                    </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>

        </View>
        {/* End Code for exiting hunt */}

        </ScrollView>
      </View>
    );
  }

  goTakePhoto = () => {
    const clueIndex = this.state.checkpoint_number
    const clues = this.state.clues
    const clue = clues[clueIndex]
    console.log(clue.clue)
    this.props.navigation.navigate(
      'TakePhoto', { 
        checkpoint_number: clueIndex, 
        checkpoint_name: clue.clue,
        checkpoint_description: clue.description,
        finalCheckpoint: this.state.clues.length - 1,
        huntCategory: this.props.navigation.getParam('selectedHuntCategory', 'NO_CATEGORY')
      }
    )}

  getClueName = () => {
    const clueIndex = this.state.checkpoint_number
    const clue = this.state.clues[clueIndex]
    if (clue) {
      this.setState({
      ...this.setState, checkpoint_name: clue.clue 
      })
    }
    return this.state.checkpoint_name
  }

  renderClue = () => {
    const clueIndex = this.state.checkpoint_number
    const clue = this.state.clues[clueIndex]
    if (clue) {
      return <Clue text={clue.description} />
    }
  }

  filterCluesHuntID(data) {
    return data.filter(clue => clue.hunt_id === this.props.navigation.getParam('selectedHuntID'))
  }

  fetchClues = () => {
    HuntApi.fetchCheckpointsbyID()
      .then(allClues => {
        let clues = this.filterCluesHuntID(allClues)
        this.setState({clues})
      })
      .catch(error => console.log(error))
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
  titleText: {
    fontSize: 30,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
  },
  clueText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  // button:{
  //   marginHorizontal: 110,
  //   marginTop:150,
  //   paddingTop:30,
  //   paddingBottom:30,
  //   backgroundColor:'#4c0a01',
  //   borderRadius:5,
  // },
  buttonText:{
    color:'#fff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  buttonTextLight:{
    color:'#fff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "300",
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  exitContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  exitButton:{
    marginRight:70,
    marginLeft:70,
    marginTop:5,
    paddingTop:5,
    paddingBottom:5,
    // backgroundColor:'#4c0a01',
    borderRadius:5,
  },
  exitText:{
      color:'#4c0a01',
      fontSize: 15,
      fontWeight: "900",
      textAlign:'right',
      paddingLeft : 10,
      paddingRight : 10,
      textAlign: 'center',
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,

  },
  howToModal: {
    marginTop:'80%',
    borderWidth: 5,
    borderColor: '#4c0a01'
  }
});