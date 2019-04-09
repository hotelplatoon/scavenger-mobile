import React from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { onSignIn } from '../auth'

export default () => (
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN IN">
      <Input 
        label='Email'
        placeholder='charles@codeplatoon.com...'
        />
      <Input
          secureTextEntry
          label='Password'
          placeholder='Password...'
        />      

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => onSignIn()}
      />
    </Card>
  </View>
);




// export default class SignUpScreen extends React.Component {
//   render () { 
//     return (
//       <View style={{ paddingVertical: 20 }}>
//         <Card title="SIGN IN">
//           <Input 
//             label='Email'
//             placeholder='charles@codeplatoon.com...'
//             />
//           <Input
//               secureTextEntry
//               label='Password'
//               placeholder='Password...'
//             />      

//           <Button
//             buttonStyle={{ marginTop: 20 }}
//             backgroundColor="#03A9F4"
//             title="SIGN IN"
//             onPress={() => alert('onSignIn()')}
//           />
//           {/* <Button 
//             buttonStyle={{ marginTop: 20 }}
//             backgroundColor="#03A9F4"
//             title="SIGN UP"
//             onPress={() => this.props.navigation.navigate("SignUpScreen")}
//           /> */}
//         </Card>
//       </View>
//     )
//   }
// }