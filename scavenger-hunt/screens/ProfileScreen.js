import React from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { onSignOut } from "../auth";
import { GlobalStorage } from "../App"
import style from '../constants/Style'

export default class ProfileScreen extends React.Component {
  render() {
    let headerText = (globalState.username) ? (globalState.username) : 'Profile'
    return (
      // <View style={{ paddingVertical: 20 }}>
      <View style={{ paddingVertical: 20, backgroundColor: "#4c0a01", height: '100%',}}>
        <ScrollView >

        <Card title={headerText}>
          <View style={style.profileImagePlaceholder}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: '300' }}>{(globalState.name)}</Text> 
          </View>
          {/* <Text style={{ color: "#4c0a01", fontSize: 18 }}>Email: {(globalState.username)}</Text> */}
            <TouchableOpacity
              style={style.wideRedButton}
              underlayColor='#fff'
              onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOutStack"))}
            >          
              <Text style={style.buttonText}>SIGN OUT</Text>
            </TouchableOpacity>
            <Button
              containerStyle={{
                marginTop: 10
              }}
              buttonStyle={{
                paddingVertical: 15,
                borderWidth: 1,
                borderColor: '#4c0a01'
              }}
              titleStyle={{
                color: '#4c0a01',
                fontSize: 20
              }}
              title="Back"
              type="outline"
              raised={true}
              onPress={() => this.props.navigation.navigate('Main')}
            />
        </Card>
        <Card title="Proudly built by Code Platoon students!">
        <View style={{ 
          // width: 20,
          marginVertical: -70
          }}>
            <Image 
              source={require('../assets/images/CPLogo.png')}
              style={{
                width: '100%',
                resizeMode: "center",
                height: 250,     
                // borderRadius: 6, 
                // margin: 8
              }} 
            />
            </View>

        </Card>
        </ScrollView>

      </View>
    )
  }
}