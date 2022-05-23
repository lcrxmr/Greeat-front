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
import {getDistance, getPreciseDistance} from 'geolib';
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
import { renderNode } from "react-native-elements/dist/helpers";
const GOOGLE_PLACES_API_KEY = "AIzaSyAp9YjV01lOFf3PSsV5trlihOM4HvLc5ZA"; // never save your real api key in a snack!

export default function Map() {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [listPins, setListPins] = useState([]);
  const [events, setEvents] = useState([]);
  const [mapSwitch, setMapSwitch] = useState(false);
  const [carousel, setCarousel] = useState([]);
  // const [carouselRestaurant, setCarouselRestaurant] = useState([]);
  // const [carouselEvent, setCarouselEvent] = useState([]);

  const [switchRestaurantsButtonBgColor, setSwitchRestaurantsButtonBgColor] =
    useState("#A8DD62");
  const [
    switchRestaurantsButtonTextColor,
    setSwitchRestaurantsButtonTextColor,
  ] = useState("white");
  const [switchEventsButtonBgColor, setSwitchEventsButtonBgColor] =
    useState("white");
  const [switchEventsButtonTextColor, setSwitchEventsButtonTextColor] =
    useState("black");

  var width = Dimensions.get("window").width; //full width
  var height = Dimensions.get("window").height; //full height

  var places;
  var pinsAroundMe = [];
  var restaurants;

  // Load map + location on loading of the screen
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
      await fetch("http://172.16.190.145:3000/nearby-places", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      });

      var rawResponse = await fetch(
        "http://172.16.190.145:3000/nearby-places",
        {
          method: "GET",
        }
      );
      places = await rawResponse.json();
      setListPins(places);
      // console.log('*********** places:',places, '*********')
      // Events from back
      var rawEvent = await fetch("http://172.16.190.145:3000/events", {
        method: "GET",
      });
      var eventFromBack = await rawEvent.json();
      setEvents(eventFromBack);
      setCarousel(restaurants)
    })();
    
    

    // console.log('*********** Restaurant Carousel',carouselRestaurant.length, '*********')
  }, [location]);

  // console.log("------List of places fetched from back: ", listPins, "------");
  console.log("------List of places fetched from back: ", listPins, "------");
  // console.log('___________events from back', events)
  // console.log("------Nearby place marker: ", Pin, "------");

  pinsAroundMe = listPins.map((Pin, i) => {
    if (mapSwitch == false) {
      return (
        <Marker
          coordinate={{
            latitude: Pin.coordinate.latitude,
            longitude: Pin.coordinate.longitude,
          }}
          title={Pin.placeName}
          description={Pin.placeId}
          pinColor="#5c49eb"
          key={i}
        >
          <Image
            source={require("../assets/pin.png")}
            style={{
              width: 40,
              height: 50,
            }}
          />
        </Marker>
      );
    }
  });
    //! ---------------------- Restaurant carousel ----------------------

  restaurants = listPins.map((restaurant, i) => {

    var dis = (getDistance(
      {latitude: location.lat, longitude: location.long },
      {latitude: restaurant.coordinate.latitude, longitude: restaurant.coordinate.longitude},
    )/1000).toFixed(1);
    
    console.log(dis)
    // console.log(restaurant.gallery[0])
    return(
      <Card borderRadius={15} containerStyle={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.8 }}>
          <Image
            style={{ borderRadius: 10, height: 120, width: 120 }}
            source={{uri: restaurant.gallery[0]}}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text
            style={{
              paddingTop: 10,
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "flex-start",
            }}
          >
            {restaurant.placeName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 18, width: 15, marginRight: 3, marginTop: 5 }}
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
          <Badge
            containerStyle={{
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
            value="Teub de poney"
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
    );
  });
  // console.log("------Pins around me:", pinsAroundMe, "------");
  // console.log('************ Restaurants', restaurants )
  //  ------------ display events around me

  var eventsAroundMe = events.map((event, i) => {
    // console.log("------Nearby place marker: ", Pin, "------");
    // event.latitude && event.longitude missing from DB
    // console.log("------ event coord: ", event, "------");

    if (mapSwitch) {
      return (
        <Marker
          coordinate={{
            latitude: JSON.parse(event.lat),
            longitude: JSON.parse(event.long),
          }}
          title={event.name}
          description={event.date}
          pinColor="#0afa72"
          key={i}
        />
      );
    }
  });
  //! ---------------------- Event carousel ----------------------
  var eventList = events.map((e, i) => {
    return (
      <Card borderRadius={15} containerStyle={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.8 }}>
            <Image
              style={{ borderRadius: 10, height: 120, width: 120 }}
              source={require("../assets/photo1.jpg")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              style={{
                paddingTop: 10,
                fontWeight: "bold",
                fontSize: 16,
                justifyContent: "flex-start",
              }}
            >
              {events[i].name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ height: 18, width: 15, marginRight: 3, marginTop: 5 }}
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
                4
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 12,
                  justifyContent: "flex-start",
                }}
              >
                {events[i].location}
              </Text>
            </View>

            <Badge
              containerStyle={{
                flex: 1,
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
              value="Teub de poney"
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
    );
  });

  //! ---------------------- Icons filter array ----------------------
  // var filterIcons = [];
  // for (let i = 0; i < 10; i++) {
  //   filterIcons.push(
  //     <View
  //       style={{
  //         alignItems: "center",
  //         paddingLeft: 10,
  //         marginTop: 10,
  //         marginLeft: 6,
  //         marginRight: 6,
  //       }}
  //     >
  //       <View style={styles.filter}>
  //         <Image
  //           source={require("../assets/fastfood.png")}
  //           style={{
  //             backgroundColor: "white",
  //             color: "grey",
  //             height: 24,
  //             width: 24,
  //             padding: 5,
  //           }}
  //         />
  //       </View>
  //       <Text
  //         style={{
  //           paddingTop: 5,
  //           fontWeight: "bold",
  //           fontSize: 10,
  //           justifyContent: "flex-start",
  //         }}
  //       >
  //         French
  //       </Text>
  //     </View>
  //   );
  // }

  var onPressRestaurants = () => {
    setMapSwitch(false);
    setCarousel(restaurants);
    if (mapSwitch) {
      setSwitchRestaurantsButtonBgColor("#A8DD62");
      setSwitchRestaurantsButtonTextColor("white");
      setSwitchEventsButtonBgColor("white");
      setSwitchEventsButtonTextColor("black");
    }
  };

  var onPressEvents = () => {
    setMapSwitch(true);
    setCarousel(eventList);
    if (!mapSwitch) {
      setSwitchRestaurantsButtonBgColor("white");
      setSwitchRestaurantsButtonTextColor("black");
      setSwitchEventsButtonBgColor("#A8DD62");
      setSwitchEventsButtonTextColor("white");
    }
  };

  //! ---------------------- Component return ----------------------

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          title="Restaurants"
          onPress={() => {
            setMapSwitch(false);
            setCarousel(carouselRestaurant);
          }}
        ></Button>
        <Button
          title="Events"
          onPress={() => {
            setMapSwitch(true);
            setCarousel(carouselEvent);
          }}
        ></Button>
      </View> */}

      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
         
      > */}

      <MapView
        style={{ flex: 1, minHeight: height * 0.8,  }}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0055,
        }}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.long }}
          title="Hi"
          description="You are here"
          pinColor="#eb3467"
          // style={{ width: 50, height: 50, zIndex: 2 }}
          anchor={{ x: 0.5, y: 0.4 }}
          centerOffset={{ x: 0, y: 0 }}
        >
          <Image
            source={require("../assets/my-pin.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </Marker>

        {eventsAroundMe}
        {pinsAroundMe}
      </MapView>
      {/* </KeyboardAvoidingView> */}

      <View
        style={{
          flex: 1,
          position: "absolute",
          width: width,
          zIndex: 2,
        }}
      >
        <GooglePlacesAutocomplete
          //autocomplete input
          style={
            {
              // flex: 1,
              // zIndex: 2,
              // position: "absolute",
            }
          }
          minLength={1}
          placeholder="Search"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en", // language of the results
          }}
          onPress={(data, details = null) => console.log(data)}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
      </View>

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
          paddingLeft: 6,
          top: 30,
        }}
      >
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
            margin: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: switchRestaurantsButtonBgColor,
            borderRadius: 25,
          }}
          titleStyle={{ color: switchRestaurantsButtonTextColor }}
          title="Restaurants"
          onPress={() => onPressRestaurants()}
        ></Button>
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
            margin: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: switchEventsButtonBgColor,
            borderRadius: 25,
          }}
          titleStyle={{ color: switchEventsButtonTextColor }}
          title="Events"
          onPress={() => {
            onPressEvents();
          }}
        ></Button>
      </View>

      {/* Filter list slider */}
      <View style={styles.filterContainer}>
        <ScrollView
          contentContainerStyle={styles.horizontalFilterScrollContent}
          style={styles.horizontalFilterScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* {filterIcons} */}
        </ScrollView>
      </View>

      {/* //! Restaurants cards slider */}
      <CardSlider style={styles.cardSlider}>{carousel}</CardSlider>
    </View>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  cardSlider: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
  },
  filterContainer: {
    flex: 1,
    position: "absolute",
    top: 90,
  },
  horizontalFilterScroll: {
    width: Dimensions.get("window").width,
  },
  horizontalFilterScrollContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  filter: {
    backgroundColor: "white",
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
  card: {
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
  },
  cardSlider: {
    position: "absolute",
    bottom: 0,
  },
});
