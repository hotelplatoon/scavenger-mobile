// import React from 'react';
// import { Platform } from 'react-native';
// import { createStackNavigator, createTabNavigator ,createAppContainer, createSwitchNavigator } from "react-navigation";

// import SignUpScreen from "../screens/SignUpScreen";
// import SignInScreen from "../screens/SignInScreen";
// import HomeScreen from "../screens/HomeScreen";
// import ProfileScreen from "../screens/ProfileScreen";

// export const SignedOutNav = createStackNavigator(
//   {  
//     SignUpScreen: { screen: SignUpScreen },
//     SignInScreen: { screen: SignInScreen }
//   },
//   {
//     initialRouteName: "SignUpScreen"
//   }
// );

// export const SignedInNav = createTabNavigator(
//   {  
//     HomeScreen: { screen: HomeScreen },
//     ProfileScreen: { screen: ProfileScreen }
//   },
//   {
//     initialRouteName: "HomeScreen"
//   }
// )

// export const SignedOutContainer = createAppContainer(createSwitchNavigator({
//   SignedOutNav: SignedOutNav,
//   SignedInNav: SignedInNav
// }))