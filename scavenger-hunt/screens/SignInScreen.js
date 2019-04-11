import React from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { onSignIn } from '../auth'
import UserAPI from '../api/UserAPI'




export default class SignInScreen extends React.Component {
// export default ({ navigation }) => (
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        password: ''
      }
    }

  _checkAsync = async () => {
    let value = await AsyncStorage.getItem('USER_KEY')
    console.log(value)
  }

  _handleLogin = () => {
    console.log('***** 26 SignInScreen this.state.username = ',this.state.username)
    console.log('***** 27 SignInScreen this.state.password = ',this.state.password)
    const loginObject =
    {
      "username": this.state.username,
      "password": this.state.password
    }
    UserAPI.sendLogin(loginObject)
      .then((res) => {
        if (res.status === 200) {
          const USER_KEY = res._bodyInit.slice(9,-1)
          console.log('********* 38 SignInScren.js',res._bodyInit.slice(9,-1))
          onSignIn(USER_KEY).then(() => this.props.navigation.navigate("SignedInStack"))
        } else {
          console.log('false')
        }
      })
      .catch((error) => {
        console.log(error)
      })      
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
        onPress={() => this._handleLogin()}
        // onPress={() => onSignIn().then(() => navigation.navigate("SignedInStack"))}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Async Test"
        onPress={() => this._checkAsync()}
        // onPress={() => onSignIn().then(() => navigation.navigate("SignedInStack"))}
      />
    </Card>
  </View>
    )
  }
};

export const USER_KEY_PROP = ({USER_KEY}) => USER_KEY;