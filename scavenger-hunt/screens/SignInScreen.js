import React from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { onSignIn } from '../auth'

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card title="SIGN IN">
      <Input 
        label='Email'
        placeholder='charles@codeplatoon.com...'
        autoCapitalize='none'
        />
      <Input
          secureTextEntry
          label='Password'
          placeholder='Password...'
          autoCapitalize='none'
        />      

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => onSignIn().then(() => navigation.navigate("SignedInStack"))}
      />
    </Card>
  </View>
);