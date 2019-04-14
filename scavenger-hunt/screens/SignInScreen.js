import React from "react";
import { View } from "react-native";
import { Card, Button, Input, Icon } from "react-native-elements";
import { onSignIn } from '../auth'
import UserAPI from '../api/UserAPI'
import { StoreGlobal } from "../App";




export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        password: '',
        id:'',
        usernameValidated: false,
        usernameValidated: false,

      }
    }

  render() {
    return(
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN IN">
      
      <Input 
        label='Email'
        placeholder='hunter@thehunt.com...'
        autoCapitalize='none'
        onChangeText={this.handleusernameChange}
        rightIcon={ this.state.usernameValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />}
        />
      
      <Input
          secureTextEntry
          label='Password'
          placeholder='Password...'
          autoCapitalize='none'
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          rightIcon={ this.state.passwordValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />}
      />      

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => this.handleLogin()}
        disabled={!(this.state.usernameValidated && this.state.passwordValidated)}
      />
      {/* <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Set global"
        onPress={() => this.setglobal()}
        
      /> */}
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Get global"
        onPress={() => this.getglobal()}
        
      />
    </Card>
  </View>
    )
  }
  setglobal = (key, value) => {StoreGlobal({type:'set', key: key, value: value})}
  getglobal = () => {StoreGlobal({type:'get', key: 'id'})}

  handleusernameChange = username => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if(reg.test(username) === false)
    {
    this.setState({username:username, usernameValidated:false})
    return false;
      }
    else {
      this.setState({username:username, usernameValidated:true})
    }
  }

  handlePasswordChange = password => {
    if (password.length > 3) {
      this.setState({passwordValidated: true})
    } else {
      this.setState({passwordValidated: false})
    }
    this.setState({password})
  }

  handleLogin = () => {
    const loginObject = this.state
    const userObject = this.state.username
    UserAPI.sendLogin(loginObject)
    .then((res) => {
      console.log('handleLogin Res', res)
      if (res.status === 200) {
        const USER_KEY = res._bodyInit.slice(9,-1)
        console.log('charles')
        onSignIn(USER_KEY).then(() => this.props.navigation.navigate("SignedInStack"))
      }
    })
    .catch((error) => console.log(error))    
    UserAPI.getUser(userObject)
      .then((res) => {
        console.log(res)
        this.setglobal('username', res[0].email)
        this.setglobal('id', res[0].id)
        this.setglobal('name', res[0].name)
      })
      .catch((error) => console.log(error))    
  }
};

export const USER_KEY_PROP = ({USER_KEY}) => USER_KEY;