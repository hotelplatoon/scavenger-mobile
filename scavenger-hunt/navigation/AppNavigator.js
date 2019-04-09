import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { createRootNavigator, SignedOutStack, SignedInStack } from './MainTabNavigator';

// export default createAppContainer({
//   createRootNavigator: createRootNavigator(signedIn)
// })

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  SignedInStack: SignedInStack,
  SignedOutStack: SignedOutStack
},
{
  initialRouteName: 'SignedInStack'
}


));