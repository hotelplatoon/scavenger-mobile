import React from "react";
import { View } from "react-native";
import { Button, Card, Input, Text } from "react-native-elements";
import { onSignIn } from '../auth'
import UserAPI from '../api/UserAPI'

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
    componentDidUpdate() {
    console.log(this.state)
  }
  _goToSignInScreen = () => {this.props.navigation.navigate('SignInScreen')}

  _addUser = () => {
    const userObject = this.state
  //   {
  //     "name": this.state.name,
  //     "email": this.state.email,
  //     "password": this.state.password
  // }

  // allFieldsFilled = () =>
    UserAPI.addUser(userObject)
      .then((response) => {
        if (response.status === 201) {
          alert('User Created');
          this._goToSignInScreen()
        } else {
          alert('No User Created')
        }
      })
      .catch((error) => {
        console.log(error)
      })      
    }

  render() {
    return(
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN UP">
    <Input
        label='Name'
        placeholder='Hunter'
        onChangeText={(name) => this.setState({name})}
      />
      <Input
        label='Email'
        placeholder='hunter@scavenger.com...'
        autoCapitalize='none'
        onChangeText={(email) => this.setState({email})}
      />
      <Input
        secureTextEntry
        label='Password'
        placeholder='Password...'
        autoCapitalize='none'
        onChangeText={(password) => this.setState({password})}
      />
      <Input
        secureTextEntry
        label='Confirm Password'
        placeholder='Confirm Password...'
        autoCapitalize='none'
        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
      />

      <Button
        buttonStyle={{ marginTop: 20 }}
        // disabled='false'
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => this._addUser()}
          // onSignIn().then(() => navigation.navigate("SignInScreen"))}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        type='outline'
        textStyle={{ color: "#bcbec1" }}
        title="SIGN IN"
        onPress={() => this.props.navigation.navigate("SignInScreen")}
      />
    </Card>
  </View>
    )
  }
};