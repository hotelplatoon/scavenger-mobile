// import React from 'react';
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   Button,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';
// import { Card, Input } from "react-native-elements";

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }
//   render (){
//     return (
//       <Button title='auth screen' />
//     )
//   }
//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };

//   export default AuthLoadingScreen