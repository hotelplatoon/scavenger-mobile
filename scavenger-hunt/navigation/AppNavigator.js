import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { SignedOutStack, SignedInStack } from './MainTabNavigator';

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      SignedInStack: {
        screen: SignedInStack
      },
      SignedOutStack: {
        screen: SignedOutStack
      }
    },
    {
      initialRouteName: signedIn ? "SignedInStack" : "SignedOutStack"
    }
  )
  )
};

