import React from "react";
import { TextInput, StyleSheet, View, Image} from "react-native";
import { Button, Card, Input, Icon} from "react-native-elements";
import UserAPI from '../api/UserAPI'


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
      allValidatedS: false,
    }
  }

  componentDidUpdate() {
    console.log(this.state.emailValidated)
    if (this.state.allValidatedS === false){
      this.allValidated()
    } else if (this.state.allValidatedS === false){
      // this.allValidated()
    }
  }
  
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.SectionsStyle}>
        <Card title="SIGN UP">
          <Input
              style={{flex:1}}
              label='Name'
              placeholder='Hunter'
              onChangeText={this.handleNameChange}
              value={this.state.name}
              rightIcon={
                <Icon
                name='check'
                  size={20}
                  color='green'
                  
                  
                />
              }

          />
          {/* <Image source={require('../assets/images/x-mark-3-64.png')} style={styles.ImageStyle} /> */}
 
          <Input
            style={{flex:1}}
            label='Email'
            placeholder='hunter@scavenger.com...'
            autoCapitalize='none'
            onChangeText={(text) => this.validateEmail(text)}
            value={this.state.email}
          />
          <Input
            secureTextEntry
            label='Password'
            placeholder='Password...'
            autoCapitalize='none'
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
          <Input
            secureTextEntry
            label='Confirm Password'
            placeholder='Confirm Password...'
            autoCapitalize='none'
            onChangeText={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={this.addUser}
            disabled={!this.state.allValidatedS}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            type='outline'
            textStyle={{ color: "#bcbec1" }}
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
  validateEmail = text => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if(reg.test(text) === false)
    {
    this.setState({email:text, emailValidated:false})
    return false;
      }
    else {
      this.setState({email:text, emailValidated:true})
    }
  }

    allValidated = () => {
      if (this.state.nameValidated && this.state.emailValidated && this.state.passwordValidated && this.state.confirmPasswordValidated) {
        this.setState({allValidatedS: true})
      } else {
        // this.setState({allValidated:  false})
      }
    }

  addUser = async () => {
    const user = this.state
    UserAPI.addUser(user)
      .then((response) => {
        console.log(response._bodyInit.slice(11,54))
        if (response.status === 201) {
          alert('User Created');
          this.goSignIn()
        } else if (response._bodyInit.slice(11,54) === 'user profile with this email already exists') {
          alert('This User already exists')
        } else {
          alert('No User Created')
        }
      })
      .catch(error => console.log(error))
  }

  goSignIn = () => this.props.navigation.navigate('SignInScreen')

  // validate = (text) => {
  //   console.log(text);
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  //   if(reg.test(text) === false)
  //   {
  //   console.log("Email is Not Correct");
  //   this.setState({email:text, allValidated:true})
  //   return false;
  //     }
  //   else {
  //     this.setState({email:text, emailValidated:true, allValidated:false})

  //     console.log("Email is Correct");
  //   }
  //   }  
};

const styles = StyleSheet.create({
 
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10
  },
  
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    margin: 10
},
 
ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'center',
    alignItems: 'center'
},
 
});