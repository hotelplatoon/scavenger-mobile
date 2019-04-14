import React from 'react';
import {   Modal, TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Clue from '../components/Clue';
import HuntApi from '../api/HuntApi'
import style from '../constants/Style'
import { Button, Icon } from 'react-native-elements';

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
      <View style={style.homeClueScreenContainer}>
        <ScrollView style={style.homeClueScreenContainer} contentContainerStyle={style.contentContainer}>

          <View>
            <Text style={style.upperSubTitleText}>
              {this.props.navigation.getParam('selectedHuntCategory', '')}
            </Text>
            <Text style={style.screenTitleText}>
              CHECKPOINT {this.state.checkpoint_number + 1}     
            </Text>
          </View>

          <View>
            {this.renderClue()}
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={this.goTakePhoto}
            underlayColor='#fff'
            >
            <Text style={style.buttonTextLight}>FOUND IT?</Text>
            <Text style={style.buttonText}>PROVE IT!</Text>
          </TouchableOpacity>

        <View style={style.homeClueScreenContainer}>
          <ScrollView style={style.homeClueScreenContainer} >
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

          <View style={{marginTop: 1}}>
            <Modal 
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{margin: 35}}>
                <View style={style.modalContainer}>
                    <View style={{ alignSelf: 'flex-end' }}>
                      <Icon
                        name="closecircleo"
                        type="antdesign"
                        size={25}
                        color="white"
                        onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                      />
                    </View>
                  <View style={{padding: 30 }}>
                    <Text style={style.modalTitleText}>Are you sure want to quit?</Text>
                    <Text style={style.modalBodyText}>_______</Text>
                    <Text style={style.modalBodyText}>{"\n"}Warning! Data from this hunt session will not be saved.</Text>
                    <Text style={style.modalBodyText}>_______</Text>
                    {/* <Text style={style.modalTitleText}>{"\n\n\n"}Good Luck!</Text> */}
                    <TouchableHighlight
                      style={style.smallOutlineButton}
                      onPress={() => this.exitHunt()}
                      underlayColor='#fff'>
                      <Text style={style.subTitleText}>Yes, I'm bored!</Text>
                    </TouchableHighlight>

                  </View>
                </View>
              </View>
            </Modal>

        </View>

        </View>

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingTop: 15,
//     backgroundColor: '#fff',
//   },
//   titleText: {
//     fontSize: 30,
//     color: '#4c0a01',
//     lineHeight: 30,
//     textAlign: 'center',
//     fontWeight: "900",
//     paddingLeft : 10,
//     paddingRight : 10,
//   },
//   clueText: {
//     fontSize: 15,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   }
// });