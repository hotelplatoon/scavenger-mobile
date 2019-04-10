import React from "react";
import { View } from "react-native";
import { Button, Card, Input, Text } from "react-native-elements";
import { onSignIn } from '../auth'

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN UP">
      <Input
        label='Email'
        placeholder='charles@codeplatoon.com...'
        autoCapitalize='none'
        // onChangeText={(email) => this.setState({email})}
      />
      <Input
        secureTextEntry
        label='Password'
        placeholder='Password...'
        autoCapitalize='none'
      />
      <Input
        secureTextEntry
        label='Confirm Password'
        placeholder='Confirm Password...'
        autoCapitalize='none'
      />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => onSignIn().then(() => navigation.navigate("SignInScreen"))}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        type='outline'
        textStyle={{ color: "#bcbec1" }}
        title="Sign In"
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </Card>
  </View>
);

// export default class SignUpScreen extends React.Component {
//   constructor(props) {
//     super(props)
//     state = {
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   }

//   componentDidUpdate() {
//     console.log(this.state)
//   }

//   render() {
//     return (
//       <View style={{ paddingVertical: 20 }}>
//       <Card title="Sign up">
//         <Text h1>Sign Up</Text>
//         <Input
//           label='Email'
//           placeholder='charles@codeplatoon.com...'
//           onChangeText={(email) => this.setState({email})}
//         />
//         <Input
//           secureTextEntry
//           label='Password'
//           placeholder='Password...'
//         />
//         <Input
//           secureTextEntry
//           label='Confirm Password'
//           placeholder='Confirm Password...'
//         />
//         <Button
//           buttonStyle={{ marginTop: 20 }}
//           backgroundColor="#03A9F4"
//           title="SIGN UP"
//           onPress={() => alert('onSignIn()')}
//         />
//         <Button
//           buttonStyle={{ marginTop: 20 }}
//           type='outline'
//           textStyle={{ color: "#bcbec1" }}
//           title="Sign In"
//           onPress={() => this.props.navigation.navigate("SignInScreen")}
//         />
//         </Card>
//       </View>

//     )
//   }
// }