import React from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { onSignIn } from '../auth'
import UserAPI from '../api/UserAPI'




export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        password: ''
      }
    }

  handleLogin = () => {
    const loginObject = this.state
    UserAPI.sendLogin(loginObject)
      .then((res) => {
        if (res.status === 200) {
          const USER_KEY = res._bodyInit.slice(9,-1)
          onSignIn(USER_KEY).then(() => this.props.navigation.navigate("SignedInStack"))
        }
      })
      .catch((error) => console.log(error))      
  }

  render() {
    return(
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN IN">
      
      <Input 
        label='Email'
        placeholder='charles@codeplatoon.com...'
        autoCapitalize='none'
        onChangeText={(username) => this.setState({username})}
        />
      
      <Input
          secureTextEntry
          label='Password'
          placeholder='Password...'
          autoCapitalize='none'
          onChangeText={(password) => this.setState({password})}
      />      

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => this.handleLogin()}
      />
    </Card>
  </View>
    )
  }
};

export const USER_KEY_PROP = ({USER_KEY}) => USER_KEY;