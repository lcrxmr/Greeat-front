import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  View,
  StyleSheet,
  LogBox,
  Image,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CardSlider from "react-native-cards-slider";
import { Card, Badge, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { getDistance, getPreciseDistance } from "geolib";


export default function EventDetailScreen({ route }) {
  const [listPins, setListPins] = useState([]);
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const navigation = useNavigation();
  const [joinButtonBgColor, setJoinButtonBgColor] = useState(false);
  const [buttonColor, setButtonColor] = useState("#476A70");
  const [join, setJoin] = useState("Join Event");
  const [userJoin, setUserJoin] = useState(173);
  // la route on press de map screen passe le param restaurant grace a {route}
  var event = route.params.event;
  useEffect(() => {
    // let mounted = true;
    // Get our location
    // setMapSwitch(false)
    // setCarousel(restaurants);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        Location.watchPositionAsync({ distanceInterval: 50 }, (location) => {
          setLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude,
          });
        });

        // console.log("______________ location", location);
      }
    })();

    // Cleanup function
    // return () => (mounted = false);
  }, []);

  useEffect(() => {
    (async () => {
      //? Fetch places from backend route /nearby-places
      //setListPins([]);
      await fetch("http://172.16.190.142:3000/nearby-places", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      });

      //   var rawResponse = await fetch(
      //     "http://172.16.190.142:3000/nearby-places",
      //     {
      //       method: "GET",
      //     }
      //   );
      //   places = await rawResponse.json();
      //   setListPins(places);
      //   // console.log('*********** places:',places, '*********')
      //   // Events from back
      //   var rawEvent = await fetch("http://172.16.190.142:3000/events", {
      //     method: "GET",
      //   });
    })();
  }, [location]);



  // ------- Function LOGO ---------

  

  var onPressJoin = () => {
    setJoinButtonBgColor(!joinButtonBgColor);
    if (!joinButtonBgColor) {
      setButtonColor("#A8DD62");
      setJoin("Joined!");
      setUserJoin(userJoin + 1);
    } else {
      setButtonColor("#476A70");
      setJoin("Join Event");
      setUserJoin(userJoin - 1);
    }
  };

  //   var date = event.date.getDate()
  //   console.log(date)

  var dis = (
    getDistance(
      { latitude: location.lat, longitude: location.long },
      { latitude: event.lat, longitude: event.long }
    ) / 1000
  ).toFixed(1);

  console.log(dis);
  // console.log(restaurant.gallery[0])
  return (
    <View style={{ flex: 1, justifyContent: "center", marginTop: 30 }}>
      {/* <View style={{ flex: 0.8 }}> */}
      <Image
        style={{
          marginLeft: 20,
          marginTop: 40,
          borderRadius: 15,
          height: 200,
          width: 350,
        }}
        source={{ uri: event.image }}
      />
      {/* </View> */}
      <Card
        borderRadius={15}
        style={{
          flexDirection: "raw",
          marginLeft: 3,
          marginRight: -0.5,
          marginBottom: 20,
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 15,
          width: Dimensions.get("window").width * 0.89,
          border: "none",
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            fontWeight: "bold",
            fontSize: 16,
            justifyContent: "flex-start",
          }}
        >
          {event.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              paddingTop: 10,
              fontSize: 16,
              justifyContent: "flex-start",
              marginRight: 3,
              marginBottom: 3,
            }}
          >
            {" "}
            {dis}
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 12,
              justifyContent: "flex-start",
            }}
          >
            Km away
          </Text>
          <Badge
            containerStyle={{
              marginTop: 10,
              marginLeft: 150,
              justifyContent: "flex-start",
            }}
            value="Burgers"
            badgeStyle={{
              backgroundColor: "#476A70",
              height: 25,
              borderRadius: 20,
            }}
            textStyle={{
              marginLeft: 5,
              marginRight: 5,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 12,
              justifyContent: "flex-start",
            }}
          >
            creator: {event.creator}
          </Text>
        </View>
        <View>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 12,
              justifyContent: "center",
            }}
          >
            Date: {event.date}
          </Text>
        </View>
      </Card>
      <View style={{ alignItems: "center" }}>
        <Button
          containerStyle={{
            shadowColor: "grey",
            shadowOffset: { width: 5, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 15,
            borderRadius: 25,
          }}
          buttonStyle={{
            marginTop: 40,
            margin: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: buttonColor,
            borderRadius: 25,
          }}
          titleStyle={{ color: "white" }}
          title={join}
          onPress={() => {
            onPressJoin();
          }}
        ></Button>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            paddingTop: 10,
            marginTop: 20,
            fontSize: 12,
            justifyContent: "center",
          }}
        >
          Participants: {userJoin}
          {/* {event.participants[0]} */}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          description: {event.description}
        </Text>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            marginTop: 20,
            justifyContent: "center",
            width: 350,
          }}
        >
          This a restaurant description, just to show how cool it can be to read
          a description on this page. Imagine that you could be reading all
          about the restaurant that you just clicked on, and decide if it's a
          good fit for you!
        </Text>
      </View>

      <Badge
        containerStyle={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 50,
        }}
        value="Retour à la map"
        badgeStyle={{
          backgroundColor: "#476A70",
          height: 25,
          borderRadius: 20,
        }}
        textStyle={{
          marginLeft: 10,
          marginRight: 10,
        }}
        onPress={() => {
          navigation.goBack("Map", { screen: "Map" });
        }}
      />
    </View>
  );
}
