import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createTabNavigator ,createBottomTabNavigator } from 'react-navigation';


import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ClueScreen from '../screens/ClueScreen';

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
  ClueScreen: {
    screen: ClueScreen,
    navigationOptions: {
      tabBarLabel: "Start Game",
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
    }
  }
});

// // export const createRootNavigator = (signedIn = false) => {
//   return createSwitchNavigator(
//     {
//       SignedInStack: {
//         screen: SignedInStack
//       },
//       SignedOutStack: {
//         screen: SignedOutStack
//       }
//     },
//     // {
//     //   initialRouteName: signedIn ? "SignedInStack" : "SignedOutStack"
//     // }
//   );
// };

// const SignedInStack = createTabNavigator({
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: {
//       tabBarLabel: "Home",
//       tabBarIcon: ({ tintColor }) => (
//         <FontAwesome name="home" size={30} color={tintColor} />
//       )
//     }
//   },
//   ProfileScreen: {
//     screen: ProfileScreen,
//     navigationOptions: {
//       tabBarLabel: "Profile",
//       tabBarIcon: ({ tintColor }) => (
//         <FontAwesome name="user" size={30} color={tintColor} />
//       )
//     }
//   }
// });
// SignedInStack.navigationOptions = {
//   tabBarLable
// }

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

// export default  SignedOutStack;
// export default SignedOutStack;
  // SignedInStack



// export default createBottomTabNavigator({
//   SignedOutStack,
//   LinksStack,
//   SettingsStack,
// });