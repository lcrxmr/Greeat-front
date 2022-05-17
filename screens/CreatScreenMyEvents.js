import * as React from 'react';
import { Card, Text,} from 'react-native-elements';
import {Image,TouchableOpacity, Button} from 'react-native'
import Create from "./CreateEventScreen"

export default function Created(props) {
    return (

        <TouchableOpacity
        
        onPress={() => {
          props.navigation.navigate("Create", { screen: "CreateEvenScreen" }) // redirrige sur Event details
        }}
      >
        <Card >
        <Button title = "Edit" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: "center", //Centered horizontally
                    alignItems: "center", //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20
                }}  onPress={() => {
                  props.navigation.navigate("Create", { screen: "CreateEvenScreen" }) // redirige sur edit de creat event
                }}/>
          <Card.Image
            style={{ width: '100%', height: 170, marginBottom: 10 }}
            source={{ uri: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303" }}
          />
          <Text> Event Name Created </Text>
          <Text> Description : RANDUM DESCRIPTION ABOUT THE EVENT</Text>
          <Image  source={require('../assets/favicon.png')} />
          <Text>3km</Text>
          <Image source={require('../assets/favicon.png')} />
          <Text>14.03.2022</Text>
        </Card>
        </TouchableOpacity>
        
      );
  }