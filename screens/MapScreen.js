import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { View, LogBox, Image, Dimensions, Text } from "react-native";
import CardSlider from "react-native-cards-slider";
import { Overlay, Card, Badge, Button } from "react-native-elements";
LogBox.ignoreLogs(["Warning: ..."]);

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
import { renderNode } from "react-native-elements/dist/helpers";
const GOOGLE_PLACES_API_KEY = "AIzaSyAp9YjV01lOFf3PSsV5trlihOM4HvLc5ZA"; // never save your real api key in a snack!

export default function Map() {
  const [location, setLocation] = useState({});
  const [listPins, setListPins] = useState([]);
  const [events, setEvents] = useState([]);
  const [mapSwitch, setMapSwitch] = useState(false);
  const [carousel, setCarousel] = useState(carouselRestaurant);

  var width = Dimensions.get("window").width; //full width
  var height = Dimensions.get("window").height; //full height

  var places;
  var pinsAroundMe = [];

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
        
        console.log("______________ location", location, );
       
      }
    })();
    // Cleanup function
    // return () => (mounted = false);
  }, []);


useEffect(() => {
  (async () => {
    //? Fetch places from backend route /nearby-places

    await fetch(
      "http://172.16.190.143:3000/nearby-places",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      }
    );

    var rawResponse = await fetch(
      "http://172.16.190.143:3000/nearby-places",
      {
        method: "GET",
      }
    );
    places = await rawResponse.json();
    setListPins(places);
    // Events from back
    var rawEvent = await fetch("http://172.16.190.143:3000/events", {
      method: "GET",
    });
    var eventFromBack = await rawEvent.json();
    setEvents(eventFromBack);
  })();
setCarousel(carouselRestaurant);
}, [location]);



  // console.log("------List of places fetched from back: ", listPins, "------");
  // console.log('___________events from back', events)

  //! Second solution to display pins of nearby places around us on the map
  pinsAroundMe = listPins.map((Pin, i) => {
    // console.log("------Nearby place marker: ", Pin, "------");
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
        />
      );
    }
  });
  // console.log("------Pins around me:", pinsAroundMe, "------");

  //  ------------ display events around me

  var eventsAroundMe = events.map((event, i) => {
    // console.log("------Nearby place marker: ", Pin, "------");
    // event.latitude && event.longitude missing from DB
    if (mapSwitch == true) {
      return (
        <Marker
          coordinate={{
            latitude: 45.761043,
            longitude: 4.855658,
          }}
          title={event.name}
          description={event.date}
          pinColor="#0afa72"
          key={i}
        />
      );
    }
  });

  var carouselRestaurant = (
    <CardSlider
      style={{
        flex: 1,
        position: "absolute",
        bottom: 0,
        marginLeft: 0,
        marginRight: 0,
        width: width,
      }}
    >
      <View style={{ paddingBottom: 20 }}>
        <Card
          borderRadius={15}
          containerStyle={{
            shadowColor: "#171717",
            shadowOffset: { width: 5, height: 15 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 20,
            width: width * 0.88,
          }}
        >
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
                Le restaurant la Vergeverte
              </Text>

              <Badge
                containerStyle={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                value="Teub de poney"
                badgeStyle={{
                  backgroundColor: "grey",
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
      </View>
    </CardSlider>
  );

  var carouselEvent = (
    <CardSlider
      style={{
        flex: 1,
        position: "absolute",
        bottom: 0,
        marginLeft: 0,
        marginRight: 0,
        width: width,
      }}
    >
      <View style={{ paddingBottom: 20 }}>
        <Card
          borderRadius={15}
          containerStyle={{
            shadowColor: "#171717",
            shadowOffset: { width: 5, height: 15 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 20,
            width: width * 0.88,
          }}
        >
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
                Event la Vergeverte
              </Text>

              <Badge
                containerStyle={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                value="Teub de poney"
                badgeStyle={{
                  backgroundColor: "grey",
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
      </View>
    </CardSlider>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
      </View>
      <MapView
        style={{ flex: 1, width: width, height: height }}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
      >
        <GooglePlacesAutocomplete
          //autocomplete input
          style={{
            position: "absolute",
          }}
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
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.long }}
          title="Hi"
          description="You are here"
          pinColor="#eb3467"
          style={{ width: 100, height: 50, zIndex: 2 }}
        />

        {eventsAroundMe}
        {pinsAroundMe}
      </MapView>
      {carousel}
    </View>
  );
}
