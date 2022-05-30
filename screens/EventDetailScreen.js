import ButtonArrow from "../components/button-arrow";
import Calendar from "../components/calendar";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Svg, { Path } from "react-native-svg";
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
import LocationMarker from "../components/LocationMarker";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

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

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

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

  // console.log(dis);
  // console.log(restaurant.gallery[0])

  // Convert UTC date to a dd/mm/yy date
  var d = new Date(event.date);
  var date = d.toLocaleDateString();


  //? Loop to display images in participants slider

  var profile = [
    require('../assets/profile1.jpg'),
    require('../assets/profile9.jpg'),
    require('../assets/profile3.jpg'),
    require('../assets/profile4.jpg'),
    require('../assets/profile5.jpg'),
    require('../assets/profile6.jpg'),
    require('../assets/profile7.jpg'),
    require('../assets/profile8.jpg'),
    require('../assets/profile2.jpg'),
    require('../assets/profile10.jpg'),
  ]
var filterIcons = [];
for (let i = 0; i < profile.length; i++) {
  console.log(profile[i])
  filterIcons.push(
    <View
      style={{
        alignItems: "center",
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: 6,
        marginRight: 6,
      }}
    >
      <View style={styles.filter}>
        <Image
          source={profile[i]}
          style={{
            backgroundColor: "white",
            color: "grey",
            height: 50,
            width: 50,
            padding: 5,
            borderRadius:100
          }}
        />
      </View>
      <Text
        style={{
          paddingTop: 5,
          fontWeight: "bold",
          fontSize: 10,
          justifyContent: "flex-start",
        }}
      >
      </Text>
    </View>
  );
}


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
          source={{ uri: event.image }}
        />
      </View>

      {/* //! -------------------- Card -------------------- */}

      <Card borderRadius={15} containerStyle={styles.card}>
        <View style={{ alignItems: "flex-start", paddingLeft: 10 }}>
          <Text
            style={{
              paddingTop: 0,
              fontWeight: "bold",
              fontSize: 24,
              justifyContent: "flex-start",
              fontFamily: "Poppins_400Regular",
            }}
          >
            {event.name}
          </Text>
        </View>

        <Text style={{ paddingLeft: 10, fontWeight: "100", color: "#C5CBD3" }}>
          ____________________________________________________
        </Text>

        {/* //? -------------------- Km away & badge -------------------- */}

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flex: 0.5,
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 15,
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
                  fontFamily: "Poppins_400Regular",
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
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Km away
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 12,
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

        {/* //? -------------------- Date -------------------- */}

        <View
          style={{
            flex: 0.5,
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 15,
            marginTop: -4,
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
            <Calendar />
            <Text
              style={{
                paddingTop: 10,
                fontSize: 16,
                justifyContent: "flex-start",
                marginRight: 3,
                marginBottom: 3,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {" "}
              {date}
            </Text>
          </View>
        </View>

        {/* //? -------------------- Created by -------------------- */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 2,
              fontSize: 12,
              justifyContent: "flex-start",
              opacity: 0.4,
              fontFamily: "Poppins_400Regular",
              paddingLeft: 15,
            }}
          >
            Created by: {event.creator}
          </Text>
          <Text
            style={{
              paddingTop: 0,
              fontWeight: "400",
              fontSize: 16,
              justifyContent: "flex-start",
              fontFamily: "Poppins_400Regular",
            }}
          >
            John Doe
          </Text>
        </View>
      </Card>

      {/* //! -------------------- Button -------------------- */}

      <View style={{ alignItems: "center" }}>
        <Button
          containerStyle={{
            shadowColor: "grey",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0,
            shadowRadius: 10,
            elevation: 15,
            borderRadius: 25,
            width: "auto",
          }}
          buttonStyle={{
            marginTop: 25,
            shadowRadius: 10,
            backgroundColor: buttonColor,
            borderRadius: 25,
            paddingTop: 12,
            paddingBottom: 12,
          }}
          titleStyle={{
            marginLeft: 32,
            marginRight: 8,
            color: "white",
            fontFamily: "Poppins_400Regular",
          }}
          title={join}
          iconRight={true}
          icon={
            <ButtonArrow
              style={{
                marginRight: 32,
                
              }}
            />
          }
          onPress={() => {
            onPressJoin();
          }}
        ></Button>
      </View>

      {/* //! -------------------- Participants -------------------- */}

      <View style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 5, }}>
        <Text
          style={{
            marginTop: 30,
            color: "#8A8C90",
            marginLeft: 15,
            fontSize: 12,
            fontFamily: "Poppins_400Regular",
          }}
        >
          {" "}
          Participants{"    "}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            justifyContent: "flex-start",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {userJoin}
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          contentContainerStyle={styles.horizontalFilterScrollContent}
          style={styles.horizontalFilterScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {filterIcons}
        </ScrollView>
      </View>

      {/* //! -------------------- Description -------------------- */}

      <Text
        style={{
          alignItems: "flex-start",
          marginTop: 15,
          color: "#8A8C90",
          marginLeft: 15,
          fontSize: 12,
          fontFamily: "Poppins_400Regular",
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
              fontFamily: "Poppins_400Regular",
              paddingBottom: 20,
            }}
          >
            This is an event description, just to show how cool it can be to
            read a description on this page. Imagine that you could be reading
            all about the restaurant that you just clicked on, and decide if
            it's a good fit for you!

          </Text>
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
    marginTop: 25,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 0,
    
  },
  filter: {
    backgroundColor: "white",
    marginTop:15,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
  },
  filterContainer: {
    flex: 1,
    height: 120,
    alignItems: "flex-start",
  },
  horizontalFilterScroll: {
    width: Dimensions.get("window").width,
  },
  horizontalFilterScrollContent: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
