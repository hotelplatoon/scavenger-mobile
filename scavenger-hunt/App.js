import React from 'react';
import { createRootNavigator } from './navigation/AppNavigator';
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
    }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return null;
    }
  const Layout =createRootNavigator(signedIn);
    return <Layout />
  }
}
globalState={}
export const StoreGlobal = (obj) => {
  if (obj.type==='set') {
    globalState[obj.key]=obj.value;
    return true;
  } else if (obj.type==='get') {
    return globalState[obj.key];
  } else {
    return null;
  }
}