import React from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import { globalEmail } from "./SignInScreen";




export default class ProfileScreen extends React.Component {
// export default ({ navigation }) => (
  
  render() {
    console.log(this.globalEmail)  
    return (
  <View style={{ paddingVertical: 20 }}>
    <Card title='Profile' >
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>C</Text>
        
      </View>
      <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOutStack"))}
      />
    </Card>
  </View>
    )
  }
}
// );
// export const profilePass = async (USER_OBJECT_PROP) => {
//   await AsyncStorage.setItem('USER_OBJECT', USER_OBJECT_PROP);
// }