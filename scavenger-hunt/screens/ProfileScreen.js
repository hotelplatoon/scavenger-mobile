import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import { GlobalStorage } from "../App"
import style from '../constants/Style'

export default class ProfileScreen extends React.Component {
  render() {
    return (
  <View style={{ paddingVertical: 20 }}>
    <Card title='Profile'>
      <View style={style.profileImagePlaceholder}>
        <Text style={{ color: "white", fontSize: 28 }}>{(globalState.name)}</Text> 
      </View>
      <Text style={{ color: "#4c0a01", fontSize: 18 }}>Email: {(globalState.username)}</Text>
        <TouchableOpacity
          style={style.wideRedButton}
          underlayColor='#fff'
          onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOutStack"))}
        >          
          <Text style={style.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
    </Card>
  </View>
    )
  }
}