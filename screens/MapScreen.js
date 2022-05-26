import React, { useState, useEffect, useRef } from "react";
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
  TouchableOpacity,
  Animated,
} from "react-native";
import CardSlider from "react-native-cards-slider";
import { Card, Badge, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  Stop,
  LinearGradient,
} from "react-native-svg";
import { getDistance, getPreciseDistance } from "geolib";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
import { renderNode } from "react-native-elements/dist/helpers";
const GOOGLE_PLACES_API_KEY = "AIzaSyAp9YjV01lOFf3PSsV5trlihOM4HvLc5ZA"; // never save your real api key in a snack!

//! ---------------------- Main function ----------------------

export default function Map(props) {
  //* ---------------------- Hooks ----------------------

  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [listPins, setListPins] = useState([]);
  const [events, setEvents] = useState([]);
  const [mapSwitch, setMapSwitch] = useState(false);
  const [carousel, setCarousel] = useState([]);
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

  //* ---------------------- Globale variables ----------------------

  var width = Dimensions.get("window").width; //full width
  var height = Dimensions.get("window").height; //full height
  const CARD_WIDTH = width * 0.8;
  var places;
  var pinsAroundMe = [];
  var restaurants;

  let mapIndex = 0;
  let animation = new Animated.Value(0);

  // Load map + location on loading of the screen
  useEffect(() => {
    // let mounted = true;
    // Get our location
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

      await fetch("http://172.16.190.131:3000/nearby-places", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      });

      var rawResponse = await fetch(
        "http://172.16.190.131:3000/nearby-places",
        {
          method: "GET",
        }
      );
      places = await rawResponse.json();
      setListPins(places);

      //? Events from back

      var rawEvent = await fetch("http://172.16.190.131:3000/events", {
        method: "GET",
      });
      var eventFromBack = await rawEvent.json();
      setEvents(eventFromBack);
      setCarousel(restaurants);
    })();

    // console.log('*********** Restaurant Carousel',carouselRestaurant.length, '*********')
  }, [location]);

  // console.log("------List of places fetched from back: ", listPins, "------");
  // console.log("------List of places fetched from back: ", listPins, "------");
  // console.log('___________events from back', events)
  // console.log("------Nearby place marker: ", Pin, "------");
  // const [state, setState] = useState(initialMapState);

  //! ---------------------- Animated pins ----------------------

  useEffect(() => {
    animation.addListener(({ value }) => {
      let indexPin = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (indexPin >= listPins.length) {
        indexPin = listPins.length - 1;
      }
      if (indexPin <= 0) {
        indexPin = 0;
      }

      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== indexPin) {
          mapIndex = indexPin;
          const { coordinate } = listPins[indexPin];
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0055,
            },
            350
          );
        }
      }, 10);
    });
  }, []);

  const interpolations = listPins.map((marker, i) => {
    const inputRange = [
      (i - 1) * CARD_WIDTH,
      i * CARD_WIDTH,
      (i + 1) * CARD_WIDTH,
    ];

    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const mapRef = useRef(null);

  //! ---------------------- Restaurants pins ----------------------

  pinsAroundMe = listPins.map((Pin, i) => {
    const scaleStyle = {
      transform: [
        {
          scale: interpolations[i].scale,
        },
      ],
    };
    if (mapSwitch == false) {
      return (
        <Marker
          coordinate={{
            latitude: Pin.coordinate.latitude,
            longitude: Pin.coordinate.longitude,
          }}
          // title={Pin.placeName}
          // description={Pin.placeId}
          pinColor="#5c49eb"
          key={i}
        >
          <Image
            source={require("../assets/pin.png")}
            style={{
              width: 40,
              height: 50,
              scaleStyle,
            }}
          />
        </Marker>
      );
    }
  });
  //! ---------------------- Restaurant carousel ----------------------

  restaurants = listPins.map((restaurant, i) => {
    var dis = (
      getDistance(
        { latitude: location.lat, longitude: location.long },
        {
          latitude: restaurant.coordinate.latitude,
          longitude: restaurant.coordinate.longitude,
        }
      ) / 1000
    ).toFixed(1);

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate("RestaurantDetailScreen", {
            screen: "RestaurantDetailScreen",
            restaurant: restaurant,
          });
        }}
      >
        <Card borderRadius={15} containerStyle={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Image
                style={{ borderRadius: 10, height: 120, width: 120 }}
                source={{ uri: restaurant.gallery[0] }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  alignItems: "flex-start",
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
                  {restaurant.placeName}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
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
                    source={require("../assets/star.png")}
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
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  });
  // console.log("------Pins around me:", pinsAroundMe, "------");
  // console.log('************ Restaurants', restaurants )

  //! ---------------------- Event pins ----------------------

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
          // title={event.name}
          // description={event.date}
          pinColor="#0afa72"
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

  //! ---------------------- Event carousel ----------------------

  var eventList = events.map((e, i) => {
    var dis = (
      getDistance(
        { latitude: location.lat, longitude: location.long },
        { latitude: e.lat, longitude: e.long }
      ) / 1000
    ).toFixed(1);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate("EventDetailScreen", {
            screen: "EventDetailScreen",
            event: e,
          });
        }}
      >
        <Card borderRadius={15} containerStyle={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Image
                style={{ borderRadius: 10, height: 120, width: 120 }}
                source={{ uri: e.image }}
              />
            </View>

            {/* //! ---------------------------------------------------- */}

            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  alignItems: "flex-start",
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
                  {events[i].name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
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
                    {e.date}
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
              </View>
            </View>

            {/* //! ---------------------------------------------------- */}

          
          </View>
        </Card>
      </TouchableOpacity>
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

  //! ---------------------- Switch buttons' functions (Restaurants / events) ----------------------

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

  //! ---------------------- Locator buttons function ----------------------

  var region = {
    latitude: location.lat,
    longitude: location.long,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0055,
  };

  var onPressRelocate = () => {
    mapRef.current.animateToRegion(region, 1000);
  };

  //! ---------------------- Component return ----------------------

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
         
      > */}

      <MapView
        style={{ flex: 1, minHeight: height * 0.8 }}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0055,
        }}
        ref={mapRef}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.long }}
          pinColor="#eb3467"
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
        {/* <GooglePlacesAutocomplete
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
        /> */}
      </View>

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
          paddingLeft: 6,
          top: 0,
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

      {/* //! ---------------------- Locator pin button ---------------------- */}

      <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 170,
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
            width: 52,
            height: 52,
            shadowRadius: 10,
            backgroundColor: "white",
            borderRadius: 30,
          }}
          icon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={23.18}
              height={26.013}
              viewBox="0 0 23.18 26.013"
            >
              <Defs>
                <LinearGradient
                  id="linear-gradient"
                  y1={1}
                  x2={1}
                  gradientUnits="objectBoundingBox"
                >
                  <Stop offset={0} stopColor="#bcea64" />
                  <Stop offset={1} stopColor="#80c35f" />
                </LinearGradient>
              </Defs>
              <G
                id="Group_47020"
                data-name="Group 47020"
                transform="translate(-351 -1389.923)"
              >
                <Circle
                  id="Ellipse_34"
                  data-name="Ellipse 34"
                  cx={4.539}
                  cy={4.539}
                  r={4.539}
                  transform="translate(365.103 1389.923)"
                  fill="#011936"
                />
                <Path
                  id="Path_2702"
                  data-name="Path 2702"
                  d="M17.82,6A10.034,10.034,0,0,0,8,16.213,12.539,12.539,0,0,0,9.1,20.932a24.226,24.226,0,0,0,4.653,6.71c1.762,1.891,3.544,3.372,4.062,3.372,1.1,0,6.87-5.861,8.638-9.934a12.314,12.314,0,0,0,1.185-4.867A10.034,10.034,0,0,0,17.82,6Zm1.118,15.2V19.929a1,1,0,0,0-2,0v1.255a5.708,5.708,0,0,1-4.582-4.694h1.257a1,1,0,0,0,0-2H12.382a5.711,5.711,0,0,1,4.556-4.526v1.088a1,1,0,0,0,2,0v-1.1a5.716,5.716,0,0,1,4.651,4.539H22.261a1,1,0,0,0,0,2h1.355A5.705,5.705,0,0,1,18.938,21.2Z"
                  transform="translate(343.006 1384.922)"
                  fill="url(#linear-gradient)"
                />
              </G>
            </Svg>
          }
          onPress={() => {
            onPressRelocate();
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

      {/* //? Restaurants cards slider */}
      <CardSlider
        style={styles.cardSlider}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {carousel}
      </CardSlider>
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
