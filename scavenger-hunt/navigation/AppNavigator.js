import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ClueScreen from '../screens/ClueScreen'
import MainTabNavigator from './MainTabNavigator';
import TakePhoto from '../components/TakePhoto';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Clue: {screen: ClueScreen},
  TakePhoto: {screen: TakePhoto},
  // Home: {screen: HomeScreen}
}));