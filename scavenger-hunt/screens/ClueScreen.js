import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Clue from '../components/Clue';
import HuntApi from '../api/HuntApi'

export default class ClueScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //array of clue objects, [0,1,2,3,4]
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
        //Last checkppoint is the lenthg of the total clues array -1
        finalCheckpoint: this.state.clues.length - 1,
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
    //The index of the clue displayed should match the checkpoint number that the user is currently on.
    //Correct clue number is grabbed using the checkpoint number as the clue index 
    const clueIndex = this.state.checkpoint_number
    const clue = this.state.clues[clueIndex]
    // const clueName = clue.clue
    //If clue object exists then grab the description of the clue and send the text to Clue as the text
    if (clue) {
      return <Clue text={clue.description} />
    }
  }

  //Filtering of clues by HuntID is currently hardcoded to 1, which is landmarks. Clue objects are pulled in from the database and then filtered if they are tagged as landmarks in the database.
  filterCluesHuntID(data) {
    return data.filter(clue => clue.hunt_id === 1)
  }

  //Call to the database to pull in clue JSON data and create an array of clue objects. 
  //filterCluesHuntID is called to match the clues with the type of hunt the user selectec (Landmark, statues, signs, etc.)
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