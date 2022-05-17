import * as React from 'react';
import { Card, Text } from 'react-native-elements';
import {Image,Button, TouchableOpacity} from 'react-native';

 
export default function Going(props) {

    return (

<TouchableOpacity
        
        onPress={() => {
          props.navigation.navigate("EditProfil", { screen: "editProfilScreen" })
        }}
      >

        <Card >
        <Button title = "Show" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: "center", //Centered horizontally
                    alignItems: "center", //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20
                }}  onPress={() => {
                  props.navigation.navigate("ProfileFromMenu", { screen: "MyEventPublic" })
                }} />
          <Card.Image
            style={{ width: '100%', height: 170, marginBottom: 10 }}
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrneRj0hEViANUgqjn1mCERWjEB8yRtOFHkA&usqp=CAU" }}
          />
          <Text> Event Name Going </Text>
          <Text> Description : RANDUM DESCRIPTION ABOUT THE EVENT</Text>
          <Image source={require('../assets/favicon.png')} />
          <Text>3km</Text>
          <Image source={require('../assets/favicon.png')} />
          <Text>14.03.2022</Text>
        </Card>
        </TouchableOpacity>
      );
  }