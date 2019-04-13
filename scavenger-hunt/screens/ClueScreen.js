import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Clue from '../components/Clue';
import HuntApi from '../api/HuntApi'

export default class ClueScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clues: [],
      checkpoint_number: 0,
      description: "",
      checkpoint_name : "",
      checkpoint_amount: 5,
      clueText: ""
    }
  }

  componentDidMount() {
    this.fetchClues()
  }

  componentDidUpdate() {
    const clueIndex = this.props.navigation.getParam('checkpoint_number', 0)
    clue = this.state.clues[clueIndex]
    if (clueIndex != this.state.checkpoint_number) {
      this.setState({
        ...this.state, checkpoint_number: clueIndex, checkpoint_name: clue.clue
      })
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.titleText}>
              {this.props.navigation.getParam('selectedHuntCategory', 'NONE')}
            </Text>
            <Text style={styles.titleText}>
              CHECKPOINT {this.state.checkpoint_number + 1}     
            </Text>
          </View>

          <View style={styles.getStartedContainer}>
            {this.renderClue()}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this.goTakePhoto}
            underlayColor='#fff'
            >
            <Text style={styles.buttonTextLight}>
              FOUND IT?
            </Text>
            <Text style={styles.buttonText}>
              PROVE IT!
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ExitButton/>
      </View>


    );
  }

  goTakePhoto = () => {
    const clueIndex = this.state.checkpoint_number
    const clues = this.state.clues
    const clue = clues[clueIndex]
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
  button:{
    marginHorizontal: 110,
    marginTop:150,
    paddingTop:30,
    paddingBottom:30,
    backgroundColor:'#4c0a01',
    borderRadius:5,
  },
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
});