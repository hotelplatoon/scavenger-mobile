import React from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Input } from "react-native-elements";
// import { onSignIn } from '../auth'
import { onSignIn, USER_KEY } from '../auth'
import UserAPI from '../api/UserAPI'




export default class SignUpScreen extends React.Component {
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
    console.log(this.state.username)
    console.log(this.state.password)
    const loginObject =
    {
      "username": this.state.username,
      "password": this.state.password
    }
    UserAPI.sendLogin(loginObject)
      .then((response) => {
        if (response.status === 200) {
          const USER_KEY = response._bodyInit.slice(9,-1)
          console.log(response._bodyInit.slice(9,-1))
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

