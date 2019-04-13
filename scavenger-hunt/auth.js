import { AsyncStorage } from "react-native";

export const onSignIn = async (USER_KEY_PROP) => {
  await AsyncStorage.setItem('USER_KEY', USER_KEY_PROP);
}

export const onSignOut = async () => await AsyncStorage.removeItem('USER_KEY');

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('USER_KEY')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};