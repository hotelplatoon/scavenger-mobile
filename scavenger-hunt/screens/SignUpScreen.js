import React from "react";
import { View  } from "react-native";
import { Button, Card, Input, Icon } from "react-native-elements";
import HuntAPI from '../api/HuntAPI';
import style from '../constants/Style'

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameValidated: false,
      emailValidated: false,
      passwordValidated: false,
      confirmPasswordValidated: false,
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
      <View style={{ paddingVertical: 20, backgroundColor: "#4c0a01", height: '100%' }}>
        <View>
          <Card>
            <Input
              containerStyle={{ marginVertical: 8 }}
              label='Name'
              placeholder='Hunter'
              onChangeText={this.handleNameChange}
              value={this.state.name}
              rightIcon={ this.state.nameValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />
              }
            />
            <Input
              containerStyle={{ marginVertical: 8 }}
              label='Email'
              placeholder='hunter@thehunt.com...'
              autoCapitalize='none'
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              rightIcon={ this.state.emailValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />
              }
            />
            <Input
              containerStyle={{ marginVertical: 8 }}
              secureTextEntry
              label='Password'
              placeholder='Password...'
              autoCapitalize='none'
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              rightIcon={ this.state.passwordValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />
              }
            />
            <Input
              containerStyle={{ marginBottom: 10, marginTop: 4 }}
              secureTextEntry
              label='Confirm Password'
              placeholder='Confirm Password...'
              autoCapitalize='none'
              onChangeText={this.handleConfirmPasswordChange}
              value={this.state.confirmPassword}
              rightIcon={ this.state.confirmPasswordValidated ?  <Icon name='check' color='green' /> : <Icon name='close' color='red' />
              }
            />
            <Button
              buttonStyle={{ 
                marginTop: 10, 
                paddingVertical: 12, 
                backgroundColor:'#4c0a01'
              }}
              title="SIGN UP"
              titleStyle={style.wideButtonText}
              onPress={this.addUser}
              disabled={!(this.state.nameValidated && this.state.emailValidated && this.state.passwordValidated && this.state.confirmPasswordValidated)}
            />
            <Button
              buttonStyle={{
                marginTop: 10, 
                paddingVertical: 12, 
                backgroundColor:'#fff',
                borderWidth: 1,
                borderColor: '#4c0a01'
              }}
              titleStyle={{
                color: '#4c0a01',
                fontSize: 20,
                fontWeight: "700",
                textAlign:'center',
                paddingLeft : 10,
                paddingRight : 10
              }}
              type='outline'
              title="SIGN IN"
              onPress={this.goSignIn}
            />
          </Card>
        </View>
      </View>
    )
  }

  handleNameChange = name => {
    if (name.length > 0) {
      this.setState({nameValidated: true})
    } else {
      this.setState({nameValidated: false})
    }
    this.setState({name})
  }

  handlePasswordChange = password => {
    if (password.length > 3) {
      this.setState({passwordValidated: true})
    } else {
      this.setState({passwordValidated: false})
    }
    this.setState({password})
  }

  handleConfirmPasswordChange = confirmPassword => {
    if (confirmPassword === this.state.password) {
      this.setState({confirmPasswordValidated: true})
    } else {
      this.setState({confirmPasswordValidated: false})
    }
    this.setState({confirmPassword})
  }

  handleEmailChange = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (reg.test(email) === false) {
      this.setState({email:email, emailValidated:false})
      return false;
    } else {
      this.setState({email:email, emailValidated:true})
    }
  }

  addUser = async () => {
    const user = this.state
    HuntAPI.addUser(user)
      .then((res) => {
        if (res.status === 201) {
          alert('User Created');
          this.goSignIn()
        } else if (res._bodyInit.slice(11,54) === 'user profile with this email already exists') {
          alert('This User already exists')
        } else {
          alert('No User Created')
        }
      })
      .catch(error => console.log(error))
  }

  goSignIn = () => this.props.navigation.navigate('SignInScreen')
};