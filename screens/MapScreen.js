import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
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
import { getDistance } from "geolib";
import { Locator } from "./../components/locator";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
import { renderNode } from "react-native-elements/dist/helpers";
const GOOGLE_PLACES_API_KEY = "xxxxxx"; // never save your real api key in a snack!

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
  var places;
  var pinsAroundMe = [];
  var restaurants;

  // Load map + location on loading of the screen
  useEffect(() => {
    //? Get our location
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
  }, []);

  useEffect(() => {
    (async () => {
      //? Fetch places from backend route /nearby-places

      await fetch("https://damp-mountain-22575.herokuapp.com/nearby-places", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      });

      var rawResponse = await fetch(
        "https://damp-mountain-22575.herokuapp.com/nearby-places",
        {
          method: "GET",
        }
      );
      places = await rawResponse.json();
      setListPins(places);

      //? Events from back

      var rawEvent = await fetch(
        "https://damp-mountain-22575.herokuapp.com/events",
        {
          method: "GET",
        }
      );
      var eventFromBack = await rawEvent.json();
      setEvents(eventFromBack);
      setCarousel(restaurants);
    })();

    // console.log('*********** Restaurant Carousel',carouselRestaurant.length, '*********')
  }, [location, listPins.length]);

  // console.log("------List of places fetched from back: ", listPins, "------");
  // console.log("------List of places fetched from back: ", listPins, "------");
  // console.log('___________events from back', events)
  // console.log("------Nearby place marker: ", Pin, "------");
  // const [state, setState] = useState(initialMapState);

  const mapRef = useRef(null);

  //! ---------------------- Restaurants pins ----------------------

  pinsAroundMe = listPins.map((Pin, i) => {
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
            style={styles.pin}
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
          <View style={styles.restaurantCardView}>
            <View style={styles.restaurantCardImgView}>
              <Image
                style={styles.cardImg}
                source={{ uri: restaurant.gallery[0] }}
              />
            </View>
            <View
              style={styles.cardRightSideView}
            >
              <View
                style={styles.titleView}
              >
                <Text
                  style={styles.title}
                >
                  {restaurant.placeName}
                </Text>
              </View>
              <View
                style={styles.textView}
              >
                <View style={styles.locationIconView}>
                  <Image
                    style={styles.iconStyle}
                    source={require("../assets/location.png")}
                  />
                  <Text
                    style={styles.locationText}
                  >
                    {" "}
                    {dis}
                  </Text>
                  <Text
                    style={styles.kmAwayText}
                  >
                    Km away
                  </Text>
                </View>

                <View
                  style={styles.starIconView}
                >
                  <Image
                    style={styles.starIconStyle}
                    source={require("../assets/star.png")}
                  />
                  <Text
                    style={styles.reviewText}
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
            style={styles.pin}
          />
        </Marker>
      );
    }
  });

  //! ---------------------- Event carousel ----------------------

  var eventList = events.map((e, i) => {
    // Convert UTC date to a dd/mm/yy date
    var d = new Date(e.date);
    var date = d.toLocaleDateString();

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
          props.navigation.navigate("EventDetail", {
            screen: "EventDetailScreen",
            event: e,
          });
        }}
      >
        <Card borderRadius={15} containerStyle={styles.card}>
          <View style={styles.cardView}>
            <View style={styles.cardImgView}>
              <Image
                style={styles.cardImg}
                source={{ uri: e.image }}
              />
            </View>
            <View
              style={styles.cardRightSideView}
            >
              <View
                style={styles.titleView}
              >
                <Text
                  style={styles.title}
                >
                  {events[i].name}
                </Text>
              </View>
              <View
                style={styles.textView}
              >
                <View style={styles.locationIconView}>
                  <Image
                    style={styles.iconStyle}
                    source={require("../assets/location.png")}
                  />
                  <Text
                    style={styles.locationText}
                  >
                    {" "}
                    {dis}
                  </Text>
                  <Text
                    style={styles.kmAway}
                  >
                    Km away
                  </Text>
                </View>

                <View
                  style={styles.starIconView}
                >
                  <Image
                    style={styles.starIconStyle}
                    source={require("../assets/date.png")}
                  />
                  <Text
                    style={styles.reviewText}
                  >
                    {" "}
                    {date}
                  </Text>
                </View>
              </View>
            </View>
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
        style={styles.searchBarView}
      >
        {/* //! ---------------------- Search bar ---------------------- 
        
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
        /> */}
      </View>

      {/* //! ---------------------- Switch buttons Restaurants/Events ---------------------- */}

      <View
        style={styles.switchButtonsMainView}
      >
        <Button
          containerStyle={styles.buttonContainerStyle}
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
          containerStyle={styles.buttonContainerStyle}
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
        style={styles.locatorButtonView}
      >
        <Button
          containerStyle={styles.locatorButtonContainer}
          buttonStyle={styles.locatorButtonStyle}
          icon={<Locator />}
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
  cardView: { flexDirection: "row" },
  cardImgView: { flex: 0.8 },
  cardImg: { borderRadius: 10, height: 120, width: 120 },
  cardRightSideView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  titleStyle: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "flex-start",
  },
  pin:{
    width: 40,
    height: 50,
  },
  textView: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 5,
  },
  locationIconView: { flexDirection: "row", alignItems: "center" },
  iconStyle: {
    height: 18,
    width: 15,
    marginRight: 3,
    marginTop: 5,
  },
  locationText: {
    paddingTop: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  kmAwayText: {
    paddingTop: 10,
    fontSize: 12,
    justifyContent: "flex-start",
  },
  starIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  starIconStyle: {
    height: 17,
    width: 17,
    marginRight: 3,
    marginTop: 0,
  },
  reviewText: {
    paddingTop: 5,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  searchBarView: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    zIndex: 2,
  },
  switchButtonsMainView: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 6,
    top: 0,
  },
  buttonContainerStyle: {
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 25,
  },
  locatorButtonContainer: {
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 25,
  },
  locatorButtonStyle: {
    margin: 10,
    width: 52,
    height: 52,
    shadowRadius: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
  locatorButtonView: {
    position: "absolute",
    right: 10,
    bottom: 170,
  },

});
