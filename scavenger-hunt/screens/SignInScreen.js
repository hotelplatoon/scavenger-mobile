import React from "react";
import { View } from "react-native";
import { Card, Input, Icon, Button } from "react-native-elements";
import { onSignIn } from '../auth'
import HuntAPI from '../api/HuntAPI'
import { StoreGlobal } from "../App"; 
import style from '../constants/Style'

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        password: '',
        id: '',
        usernameValidated: false,
        usernameValidated: false,
      }
    }

    static navigationOptions = {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#4c0a01',
      headerTitleStyle: {
        fontWeight: '900',
        fontSize: 20
      },
    }

  render() {
    return(
      <View style={{ paddingVertical: 20, backgroundColor: "#4c0a01", height: '100%',}}>
        <Card>
          <Input
            containerStyle={{ marginVertical: 10 }}
            label='Email'
            placeholder='hunter@thehunt.com...'
            autoCapitalize='none'
            onChangeText={this.handleusernameChange}
            rightIcon={ this.state.usernameValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />}
            />
          <Input
            secureTextEntry
            containerStyle={{ marginBottom: 20 }}
            label='Password'
            placeholder='Password...'
            autoCapitalize='none'
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            rightIcon={ this.state.passwordValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />}
          />
          <Button
            buttonStyle={{ 
              marginTop: 10, 
              paddingVertical: 12, 
              backgroundColor:'#4c0a01'
            }}
            title="SIGN IN"
            titleStyle={style.wideButtonText}
            onPress={() => this.handleLogin()}
            disabled={!(this.state.usernameValidated && this.state.passwordValidated)}  
          />   
        </Card>
      </View>
    )
  }

  setglobal = (key, value) => {StoreGlobal({type:'set', key: key, value: value})}

  handleusernameChange = username => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (reg.test(username) === false) {
      this.setState({username:username, usernameValidated:false})
      return false;
    } else {
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
    HuntAPI.sendLogin(loginObject)
    .then((res) => {
      if (res.status === 200) {
        const USER_KEY = res._bodyInit.slice(9,-1)
        onSignIn(USER_KEY).then(() => this.props.navigation.navigate("SignedInStack"))
      }
    })
    .catch((error) => console.log(error))    

    HuntAPI.getUser(userObject)
      .then((res) => {
        this.setglobal('username', res[0].email)
        this.setglobal('id', res[0].id)
        this.setglobal('name', res[0].name)
      })
      .catch((error) => console.log(error))    
  }
};

export const USER_KEY_PROP = ({USER_KEY}) => USER_KEY;