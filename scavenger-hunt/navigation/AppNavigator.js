import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { SignedOutStack, SignedInStack } from './MainTabNavigator';

// export default createAppContainer({
//   createRootNavigator: createRootNavigator
// })

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

// export const createRootNavigator = (signedIn = false) => {
//   return createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   // Main: MainTabNavigator,
//   SignedOutStack: SignedOutStack,
//   SignedInStack: SignedInStack,
  
// },
// {
//   initialRouteName: signedIn ? "SignedInStack" : "SignedOutStack"
// }


// ));
// }