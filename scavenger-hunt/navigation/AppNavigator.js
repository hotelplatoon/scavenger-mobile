import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { SignedOutStack, SignedInStack } from './MainTabNavigator';
import TakePhoto from '../components/TakePhoto';
import ClueScreen from '../screens/ClueScreen'
import GalleryScreen from '../screens/GalleryScreen'

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

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
  // Clue: {screen: ClueScreen},
  // TakePhoto: {screen: TakePhoto},
  // Gallery: {screen: GalleryScreen}
// }));

