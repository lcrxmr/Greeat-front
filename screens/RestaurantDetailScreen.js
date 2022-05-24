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
import Svg, { G, Path } from "react-native-svg";
import { getDistance, getPreciseDistance } from "geolib";

export default function RestaurantDetail({ route }, props) {
  const [listPins, setListPins] = useState([]);
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const navigation = useNavigation();

  // la route on press de map screen passe le param restaurant grace a {route}
  var restaurant = route.params.restaurant;
  console.log("********* restaurant from map", restaurant);
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

  var dis = (
    getDistance(
      { latitude: location.lat, longitude: location.long },
      {
        latitude: restaurant.coordinate.latitude,
        longitude: restaurant.coordinate.longitude,
      }
    ) / 1000
  ).toFixed(1);

  console.log(dis);
  // console.log(restaurant.gallery[0])
  return (
    <View
      style={{
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 30,
      }}
    >
      {/* <View style={{ flex: 0.8 }}> */}
      <Image
        style={{marginLeft:20, marginTop: 40, borderRadius: 15, height: 200, width: 350 }}
        source={{ uri: restaurant.gallery[0] }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            justifyContent: "center",
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          * * * * * {restaurant.rating} / 5
        </Text>
      </View>
      
        <Card
          borderRadius={15}
          style={{
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
              justifyContent: "center",
            }}
          >
            {restaurant.placeName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image
              style={{ height: 18, width: 15, marginRight: 3, marginTop: 5 }}
              source={require("../assets/location.png")}
            />
            <Text
              style={{
                paddingTop: 10,
                fontSize: 16,
                justifyContent: "center",
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
                justifyContent: "center",
              }}
            >
              Km away
            </Text>
            <Badge
              containerStyle={{
                marginTop: 10,
                marginLeft: 150,
                flex: 1,
                justifyContent: "flex-start",
              }}
              value="Restaurant"
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
        </Card>
        <Text
          style={{
            paddingTop: 10,
            marginLeft: 20,
            marginTop: 10,
            fontSize: 14,
            justifyContent: "center",
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontSize: 12,
            margin: 20,
            justifyContent: "center",
            width: 350,
          }}
        >
          This a restaurant description, just to show how cool it can be to read
          a description on this page. Imagine that you could be reading all about
          the restaurant that you just clicked on, and decide if it's a good fit
          for you!
        </Text>
        <Badge
          containerStyle={{
            flex: 1,
            justifyContent: "flex-start",
            marginTop:50,
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
