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
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import CardSlider from "react-native-cards-slider";
import { Card, Badge, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";
import { getDistance, getPreciseDistance } from "geolib";
import FavoriCon from "../components/FavoriCon";
import RestaurantDescription from "../components/RestaurantDescription";
import BackArrow from "../components/BackArrow";
import GoldStar from "../components/GoldStar";
import GreyStar from "../components/GreyStar";
import LocationMarker from "../components/LocationMarker";
import ArrowRestaurantDetailsMap from "../components/ArrowRestaurantDetailsMap";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';


export default function EventDetails({ route }, props) {


  let [fontsLoaded] = useFonts({
    Poppins_400Regular
  });


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
      await fetch("http://192.168.164.78:3000/nearby-places", {
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
    <ScrollView style={{ backgroundColor: "#FDFDFD" }}>
      {/* //! -------------------- Header image -------------------- */}

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{
            borderRadius: 10,
            height: 220,
            width: Dimensions.get("window").width * 0.95,
          }}
          source={{ uri: restaurant.gallery[0] }}
        />
      </View>

      {/* //! -------------------- Reviews -------------------- */}

      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GreyStar />
        <Text
          style={{
            paddingTop: 5,
            fontSize: 20,
            justifyContent: "flex-start",
            marginRight: 3,
            marginBottom: 5,
            marginLeft: 8,
          }}
        >
          {" "}
          {restaurant.rating}
        </Text>

        <Text
          style={{
            paddingTop: 5,
            fontSize: 12,
            justifyContent: "flex-start",
          }}
        >
          /5
        </Text>
      </View>

      {/* //! -------------------- Card -------------------- */}

      <Card borderRadius={15} containerStyle={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 0.5,
              alignItems: "flex-start",
              justifyContent: "center",
              paddingBottom: 8,
              paddingTop: 8,
              paddingLeft: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: -2,
              }}
            >
              <LocationMarker />
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 16,
                  justifyContent: "flex-start",
                  marginRight: 3,
                  marginBottom: 3,
                  fontFamily: "Poppins_400Regular"
                }}
              >
                {" "}
                {dis}
              </Text>
              <Text
                style={{
                  paddingTop: 8,
                  color: "#AEB1B5",
                  fontSize: 12,
                  justifyContent: "flex-start",
                  fontFamily: "Poppins_400Regular"
                }}
              >
                Km away
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              marginLeft: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Badge
              value="French cuisine"
              badgeStyle={{
                backgroundColor: "#476A70",
                height: 28,
                borderRadius: 20,
              }}
              textStyle={{
                marginLeft: 10,
                marginRight: 10,
                fontSize: 14,
              }}
            />
          </View>
        </View>
      </Card>

      {/* //! -------------------- Location -------------------- */}

      <Text
        style={{
          alignItems: "flex-start",
          marginTop: 25,
          color: "#8A8C90",
          marginLeft: 15,
          fontSize: 12,
          fontFamily: "Poppins_400Regular"
        }}
      >
        {" "}
        Location{" "}
      </Text>

      <View style={{ paddingTop: 15, justifyContent: "center" }}>
        <Image
          source={require("../assets/MaskGroup2.png")}
          style={{ width: Dimensions.get("window").width, height: 120 }}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            top: 30,
          }}
        >
          <Text style={{ flex: 0.5, lineHeight: 22, marginLeft: 40, fontFamily: "Poppins_400Regular" }}>
            3 Rue de la Vergouille, 69003, Lyon. France
          </Text>

          <View
            style={{
              flex: 0.5,
              alignItems: "flex-end",
              marginRight: 50,
              marginTop: 10,
            }}
          >
            <ArrowRestaurantDetailsMap />
          </View>
        </View>

        <View />

        {/* //! -------------------- Description -------------------- */}

        <Text
          style={{
            alignItems: "flex-start",
            marginTop: 25,
            color: "#8A8C90",
            marginLeft: 15,
            fontSize: 12,
            fontFamily: "Poppins_400Regular"
          }}
        >
          {" "}
          Description{" "}
        </Text>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 0.5,
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                justifyContent: "flex-start",
                marginLeft: 8,
                marginBottom: 3,
                marginRight: 10,
                color: "#011936",
                lineHeight: 24,
                fontFamily: "Poppins_400Regular"
              }}
            >
              Neque porto quisquam est qui dolore ipsum quia donor sit met,
              consecteur, adipsci velit sit met, consecteur, adipsci sit met,
              consecteur, adipsci …
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  card: {
    marginLeft: 18,
    marginBottom: 10,
    marginTop: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 0,
  },
});
