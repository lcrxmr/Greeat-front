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
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CardSlider from "react-native-cards-slider";
import { Card, Badge, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";
import { getDistance, getPreciseDistance } from "geolib";
import FavoriCon from "../components/FavoriCon";
import RestaurantMapPicture from "../components/RestaurantDetailsMap";
import RestaurantDescription from "../components/RestaurantDescription";
import BackArrow from "../components/BackArrow";
import GoldStar from "../components/GoldStar";
import LocationMarker from "../components/LocationMarker";
import ArrowRestaurantDetailsMap from "../components/ArrowRestaurantDetailsMap";

export default function EventDetails({ route }, props) {
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
      await fetch("http://192.168.43.193:3000/nearby-places", {
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
    <View style={{ flex: 1, alignItems: "center", paddingTop: 25 , width: "100%" }}>
      
      <Image
        style={{ borderRadius: 10, height: 200, width: 300 }}
        source={{ uri: restaurant.gallery[0] }}
      />
      {/* <View style={{ flexDirection: "row", paddingTop: 25  }}>
        
        <Image
          style={{ borderRadius: 10, height: 94, width: 94 }}
          source={{ uri: restaurant.gallery[0] }}
        />
        <Image
          style={{ borderRadius: 10, height: 94, width: 94 }}
          source={{ uri: restaurant.gallery[0] }}
        />
        <Image
          style={{ borderRadius: 10, height: 94, width: 94 }}
          source={{ uri: restaurant.gallery[0] }}
        />
      </View> */}

      
      
        

        <View
          style={{
            paddingTop:25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom:20
          }}
        >
          <GoldStar />
          <GoldStar />
          <GoldStar />
          <GoldStar />
          <GoldStar />
          <Text
            style={{
              
              fontSize: 12,
            }}
          >
            : {restaurant.rating} / 5
          </Text>
        </View>
        <View
          style={{
            width: 327,
            height: 65.82,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            opacity: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <LocationMarker />
            <Text>{dis}km away</Text>
          </View>
          <View
            style={{
              width: 109,
              height: 21,
              backgroundColor: "#476A70",
              alignItems: "center",
              borderRadius: 11,

            }}
          >
            <Text>French cuisine</Text>
          </View>
        </View>
        <View style={{ width: '100%', paddingTop: 25 }}>
          <Text style={{ fontSize: 12 }}>Location</Text>
        </View>
        <View style={{ width: '100%', paddingTop: 15 }}>
          <RestaurantMapPicture  />
          <ArrowRestaurantDetailsMap style={{ marginTop: -80, marginLeft: 275}}/>
          <Text  style={{ marginTop: -80}}>3 Rue de la Vergouille,{"\n"} 69003, Lyon. France</Text>
        <View/>
        
          <View style={{paddingTop: 90}}>
            <Text style={{ fontSize: 12 }}>Description</Text>
            <RestaurantDescription style={{paddingTop: 15}} />
          </View>
        </View>
      
    </View>
  );
}

