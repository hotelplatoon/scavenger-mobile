import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ClueText from '../components/ClueText';
// import { ExpoLinksView } from '@expo/samples';
import HuntApi from '../api/HuntApi'

export default class ClueScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clues: [],
      // flag: false,
      checkpoint_number: 1,
      description: "",
      // clueName: "",
      hunts: [],
      // checkpoint_number: {this.props.navigation.checkpoint_number}? {this.props.navigation.checkpoint_number} : null}

      // clues: ["________, created by noted American artist Alexander Calder, is a 53-foot (16 m) tall stabile located in the Federal Plaza in front of the Kluczynski Federal Building in Chicago, Illinois, United States.", "Clue 2"],
      checkpoint_name : "",
      checkpoint_amount: 0
    }
  }

  //get the checkpoint amount of the hunt_id
  getHunts() {
    HuntApi.fetchHuntByID()
      .then((apiResponseJSON) => {
      return
      }
    )
  }

  // filterCluesHuntID() {
  //   this.setState({
  //     hunt: apiResponseJSON
  //   })
  // }

  filterCluesHuntID(data) {
    return data.filter(clue => clue.hunt_id === 1)
  }

  filterCluesCheckpointNumber(clues) {
    // console.log(`47 ${typeof(this.state.checkpoint_number)}`)
    // console.log(`48 ${this.state.checkpoint_number}`)
    let number = this.state.checkpoint_number
    let clue = clues.filter(function(clue, index, self) {
      // console.log(`50 ${self.indexOf(clue)}`)
      return self.indexOf(clue) === number
  });
  return clue;
  }

  getClueText(clue) {
    let clueText = clue.map(function(clue) {
      return clue.description;
    })
    console.log(clueText);
    return clueText
  }

  getClueName(clue) {
    let clueName = clue.map(function(clue) {
      return clue.clue;
    })
    console.log(clueName);
    return clueName
  }

  getCheckpointAmount (hunts) {
    let checkpointAmount = hunts.filter(function(hunt) {
    if (hunt.pk === 1) {
      return hunt.checkpoint_amount;
    }})
    console.log(checkpointAmount);
    return checkpointAmount
  }

  // filterCluesCheckpointNumber(clues) {
  // return clues.find(index => index === 2)
  // }

  changeClues() {
      HuntApi.fetchCheckpointsbyID()
        .then((apiResponseJSON) => {
          let hunts = this.getHuntInfo()
          let cluesByHuntID = this.filterCluesHuntID(apiResponseJSON)
          let correctClue = this.filterCluesCheckpointNumber(cluesByHuntID)
          let checkpointAmount = this.getCheckpointAmount(hunts)
          let clueText = this.getClueText(correctClue)
          let clueName = this.getClueName(correctClue)

          this.setState({
            hunts: hunts,
            clues: clueText,
            checkpoint_name: clueName,
            checkpoint_amount: checkpointAmount
            // description:  
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

  componentDidMount() {
    // this.changeCheckpointNumber()
    console.log(`98 ${this.state.checkpoint_number}`)
    if (this.state.checkpoint_number === 1) {
      this.changeClues()
    }
    else if (this.state.checkpoint_number <= this.state.checkpoint_amount()) {
      this.setState ({
        checkpoint_number: this.props.navigation.getParam('checkpoint_number', 'Number did not pass'),
      })
      console.log(this.state.checkpoint_number)
      this.changeClues()
    }
    else {
      console.log("the game should be over now.")
    }
  }

  // componentDidUpdate() {

  // }
  // // }

  render() {
    console.log(this.state.clues);
    // console.log(`\n24: Checkpoint number "${this.props.navigation.getParam('checkpoint_number', 'no value')}" passed from TouchScreen`) 

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.titleText}>CHECKPOINT {this.state.checkpoint_number + 1}</Text>
          </View>
          <View style={styles.getStartedContainer}>
            {/* <ClueText clueText={this.state.clues[this.state.checkpoint_number - 1]}/> */} 
            <ClueText clueText= {this.state.clues}/>
            {/* {this.state.clues ? <ClueText clueText= {this.state.clues}/> : null} */}

          </View>

          {/* Button to navigate to new hunt */}
          <TouchableOpacity
            style={styles.button}

            onPress={() => this.props.navigation.navigate('TakePhoto', {checkpoint_number: (this.state.checkpoint_number), checkpoint_name: this.state.checkpoint_name})}

            underlayColor='#fff'>
            <Text style={styles.buttonTextLight}>FOUND IT?</Text>

            <Text style={styles.buttonText}>PROVE IT!</Text>
          </TouchableOpacity>

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