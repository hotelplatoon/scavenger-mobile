import React from "react";
import { View, AsyncStorage, TouchableOpacity } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import { globalEmail } from "./SignInScreen";
import style from '../constants/Style'

export default class ProfileScreen extends React.Component {
// export default ({ navigation }) => (
  
  render() {
    console.log(this.globalEmail)  
    return (
  <View style={{ paddingVertical: 20 }}>
    <Card title='Profile'>
      <View style={style.profileImagePlaceholder}>
        <Text style={{ color: "white", fontSize: 28 }}>C</Text> 
      </View>
      {/* <Text style={{ color: "#4c0a01", fontSize: 18 }}>Email:</Text> */}
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
// );
// export const profilePass = async (USER_OBJECT_PROP) => {
//   await AsyncStorage.setItem('USER_OBJECT', USER_OBJECT_PROP);
// }