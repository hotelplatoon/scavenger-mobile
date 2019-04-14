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
        passedName:'',
        passedID: 0,
        passedEmail: '',
        emailValidated: false,
        passwordValidated: false,

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
        onChangeText={this.handleEmailChange}
        rightIcon={ this.state.emailValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />}
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
        disabled={!(this.state.emailValidated && this.state.passwordValidated)}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Set global"
        onPress={() => this.setglobal()}
        
      />
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
  setglobal = () => {StoreGlobal({type:'set', key:'ok', value:'cool'})}
  getglobal = () => {StoreGlobal({type:'get', key:'ok'})}
  handleEmailChange = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if(reg.test(email) === false)
    {
    this.setState({email:email, emailValidated:false})
    return false;
      }
    else {
      this.setState({email:email, emailValidated:true})
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
      if (res.status === 200) {
        const USER_KEY = res._bodyInit.slice(9,-1)
        onSignIn(USER_KEY).then(() => this.props.navigation.navigate("SignedInStack", {passedName: this.state.passedName})
        
        )
      }
    })
    .catch((error) => console.log(error))    
    UserAPI.getUser(userObject)
      .then((res) => {
        const localEmail = res[0].email
        // this.setState({passedEmail: res[0].email, passedName: res[0].name, passedID: res[0].id})
        console.log(this.state)
        // profilePass(USER_OBJECT)
        return localEmail

      })
      .catch((error) => console.log(error))    
  }
};

export const USER_KEY_PROP = ({USER_KEY}) => USER_KEY;
export const globalEmail = ({localEmail}) => localEmail;
// export const USER_OBJECT_PROP = ({USER_OBJECT}) => USER_OBJECT;