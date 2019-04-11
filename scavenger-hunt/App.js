import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator, { createRootNavigator } from './navigation/AppNavigator';
import { isSignedIn } from './auth'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
  componentDidUpdate(){ 
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
  };
}


  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
      console.log('******** 22 App.js this.state',this.state)
    }

  render() {
    console.log('********* 26 App.js this.state',this.state)
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
  const Layout =createRootNavigator(signedIn);
    return <Layout />

  }
}