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
      await fetch("http://192.168.1.28:3000/nearby-places", {
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
  var d = new Date(event.date);
  var n = d.toLocaleDateString();

  var dis = (
    getDistance(
      { latitude: location.lat, longitude: location.long },
      { latitude: event.lat, longitude: event.long }
    ) / 1000
  ).toFixed(1);

  console.log(dis);

    var profile = [
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
      {image: '../assets/profilepic1.jpg'},
  
    ]

  var filterIcons = [];
  for (let i = 0; i < profile.length; i++) {
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
            source={{uri: profile[i].image}}
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



  // console.log(restaurant.gallery[0])
  return (
    <ScrollView >
      {/* <View style={{ flex: 0.8 }}> */}
      <Image
        style={{
          marginLeft: 20,
          marginTop: 0,
          borderRadius: 15,
          height: 200,
          width: 350,
          marginBottom: 10,
        }}
        source={{ uri: event.image }}
      />
      {/* </View> */}
      <Card borderRadius={15} containerStyle={styles.card}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
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
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.8, paddingTop:5 }}>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-start",
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    height: 18,
                    width: 15,
                    marginRight: 3,
                    marginTop: 5,
                  }}
                  source={require("../assets/location.png")}
                />
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: -2,
                }}
              >
                <Image
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 3,
                    marginTop: 0,
                  }}
                  source={require("../assets/date.png")}
                />
                <Text
                  style={{
                    paddingTop: 5,
                    fontSize: 16,
                    justifyContent: "flex-start",
                    marginRight: 3,
                    marginBottom: 3,
                    
                  }}
                >
                  {" "}
                  {n}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 12,
                    justifyContent: "flex-start",
                  }}
                >
                  Created by: 
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 16,
                    justifyContent: "flex-start",
                    marginLeft: 5,
                    marginBottom: 3,
                  }}
                >
                  John Doe
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 5,
              paddingTop: 0
            }}
          >
            <Badge
              containerStyle={{
                justifyContent: "flex-end",
                marginBottom: 50,
                color: "#476A70",
              }}
              value="Evénement"
              badgeStyle={{
                backgroundColor: "#476A70",
                height: 25,
                borderRadius: 20,
              }}
              textStyle={{
                marginLeft: 10,
                marginRight: 10,
              }}
            />
          </View>
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
            marginBottom: 10,
          }}
          buttonStyle={{
            marginTop: 20,
            marginBottom: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: buttonColor,
            borderRadius: 25,
            justifyContent: "space-around",
          }}
          titleStyle={{ color: "white" }}
          title={join}
          iconRight={true}
          icon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16.079}
              height={11.529}
              viewBox="0 0 16.079 11.529"
            >
              <Path
                id="Path_220"
                data-name="Path 220"
                d="M9,13.765a.824.824,0,0,0,.824.824H22.267l-3.535,3.535A.824.824,0,1,0,19.9,19.289l4.942-4.942a.815.815,0,0,0,.24-.578v0a.8.8,0,0,0-.064-.315.815.815,0,0,0-.178-.267L19.9,8.242A.824.824,0,1,0,18.73,9.407l3.537,3.535H9.824A.824.824,0,0,0,9,13.765Z"
                transform="translate(-9 -8.001)"
                fill="#bcea64"
              />
            </Svg>
          }
          onPress={() => {
            onPressJoin();
          }}
        ></Button>
      </View>
      <View>
      <View style={{flexDirection:'row', alignItems: "flex-start", marginLeft: 20 }}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 12,
            justifyContent: "center",
            fontWeight: "500",
          fontSize: 12,
          opacity: 0.3,
          }}
        >
          Participants: 
          {/* {event.participants[0]} */}
        </Text>
        <Text
        style={{
          marginTop: 20,
          marginLeft: 10,
          fontSize: 12,
          justifyContent: "center",
          fontWeight: "800",
        fontSize: 12,
          }}
        > {userJoin}</Text>
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
      </View>
      
      

      <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            marginTop: 20,
            fontWeight: "600",
            justifyContent: "center",
          }}
        >
          Description: {event.description}
        </Text>
        <Text
          style={{
            paddingTop: 0,
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardSlider: {
    flex: 1,
    bottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: Dimensions.get("window").width,
  },
  card: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.95,
    border: "none",
  },
  filter: {
    backgroundColor: "white",
    marginTop:20,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    flex: 1,
    height: 100,
    marginTop: 10,
  },
  horizontalFilterScroll: {
    width: Dimensions.get("window").width,
  },
  horizontalFilterScrollContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
