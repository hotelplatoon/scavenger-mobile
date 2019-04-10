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
      clue: [],
      checkpoint_number : 1,
      // clues: ["________, created by noted American artist Alexander Calder, is a 53-foot (16 m) tall stabile located in the Federal Plaza in front of the Kluczynski Federal Building in Chicago, Illinois, United States.", "Clue 2"],
      checkpoint_name : "Merchandise Mart"
    }
  }

  //maybe write a function that takes the clue object array and keeps track of the index.
  //increment the index and use that as the checkpoint number.
  changeClues() {
    HuntApi.fetchCheckpointsbyID(this.state.checkpoint_number)
      .then((apiResponseJSON) => {
        this.setState({
        clues: apiResponseJSON})
      }
    )
  }

  componentDidMount() {
    this.changeClues()
    }

  // createClueFields = () => {
  //   return this.props.clues.map((huntID, clue, description, index) => 
  //       key={index},
  //       huntID={huntID},
  //       clue={clue},
  //       description={description}
  //   )}

  // static navigationOptions = {
  //   title: 'Checkpoint',
  // };

  render() {
    // const {navigate} = this.props.navigation;
    console.log(this.state.clues);
    // console.log(this.state.clue);

    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.titleText}>CHECKPOINT {this.state.checkpoint_number}</Text>
          </View>
          <View style={styles.getStartedContainer}>
            {/* <ClueText clueText={this.state.clues[this.state.checkpoint_number - 1]}/> */}
            <ClueText clueText= {this.state.clues.description}/>
            {/* {this.state.clues ? <ClueText clueText= {this.state.clues}/> : null} */}

          </View>

          {/* Button to navigate to new hunt */}
          <TouchableOpacity
            style={styles.button}

            onPress={() => this.props.navigation.navigate('TakePhoto', {checkpoint_name: this.state.clues.clue}, {checkpoint_number: this.state.checkpoint_number})}

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
