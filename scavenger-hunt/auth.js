import { AsyncStorage } from "react-native";

export const USER_KEY = "6a9e885d96c8c68773dae103d6be815236560c3c";


export const onSignIn = () => {
  console.log('auth 7',USER_KEY)
  AsyncStorage.setItem('USER_KEY', USER_KEY);
}

export const onSignOut = () => AsyncStorage.removeItem('USER_KEY');

export const isSignedIn = () => {
  console.log('auth line 10', USER_KEY)
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('USER_KEY')
      .then(res => {
        console.log('\n Auth.js 13 res',res)
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};