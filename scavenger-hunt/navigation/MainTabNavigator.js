import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TakePhoto from '../components/TakePhoto';
import ClueScreen from '../screens/ClueScreen'
import GalleryScreen from '../screens/GalleryScreen'
import SelectThemeScreen from '../screens/SelectThemeScreen';
import FinishScreen from '../screens/FinishScreen';

export const SignedOutStack = createStackNavigator({
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "JOIN THE HUNT"
    }
  },
  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      title: "JOIN THE HUNT"
    }
  }
});

export const SignedInStack = createStackNavigator({
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
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
