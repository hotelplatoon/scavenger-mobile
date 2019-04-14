import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TakePhoto from '../components/TakePhoto';
import ClueScreen from '../screens/ClueScreen'
import GalleryScreen from '../screens/GalleryScreen'
import SelectThemeScreen from '../screens/SelectThemeScreen';
import FinishScreen from '../screens/FinishScreen';
import ExitButton from '../components/1ExitButton';


export const SignedOutStack = createStackNavigator({
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      title: "Sign In"
    }
  }
});

export const SignedInStack = createBottomTabNavigator({
  
  Main: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Start Game",
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
    }
  },  
  Clue: {screen: ClueScreen,
    navigationOptions: {
      tabBarLabel: "Clue Screen",
    }
  },
  TakePhoto: {screen: TakePhoto,
    navigationOptions: {
      tabBarLabel: "Take Photo",
    }
  },
  ExitButton: {screen: ExitButton,
    navigationOptions: {
    tabBarLabel: "Exit",
    }
  },
  Gallery: {screen: GalleryScreen,
    navigationOptions: {
    tabBarLabel: "Gallery",
    }
  },
  SelectTheme: {screen: SelectThemeScreen,
    navigationOptions: {
    tabBarLabel: "Choose Theme",
    }
  },
  Finish: {screen: FinishScreen,
    navigationOptions: {
    tabBarLabel: "Finish",
    }
  },
});
