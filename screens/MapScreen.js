import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Image} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LogBox } from "react-native";
import Carousel from "simple-carousel-react-native";
LogBox.ignoreLogs(["Warning: ..."]);

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
const GOOGLE_PLACES_API_KEY = "AIzaSyAp9YjV01lOFf3PSsV5trlihOM4HvLc5ZA"; // never save your real api key in a snack!

export default function Map() {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [listPins, setListPins] = useState([]);
  var places;
  var pinsAroundMe = [];

  // Load map + location on loading of the screen
  useEffect(() => {

    let mounted = true;

    // Get our location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted" && mounted) {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude,
          });
        });

         //? Fetch places from backend route /nearby-places
        var rawResponse = await fetch(
          "http://172.16.190.143:3000/nearby-places",
          {
            method: "GET",
          }
        );
        places = await rawResponse.json();
        setListPins(places);
  
      }
    })();

    // Cleanup function
    return () => mounted = false

  }, []);

// console.log("------List of places fetched from back: ",listPins,"------");



    //! Second solution to display pins of nearby places around us on the map 
    pinsAroundMe = listPins.map((Pin, i) => {
      console.log("------Nearby place marker: ", Pin, "------");
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
    
      });

  // console.log("------Pins around me:",pinsAroundMe,"------")



  return (
    <View
      style={{
        flex: 1,
      }}
    >


      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.0421,
        }}
      >
              <GooglePlacesAutocomplete
        //autocomplete input
        style={{
          flex: 1,
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
          style={{ width: 250, height: 50 }}
        />
        {pinsAroundMe}
      </MapView>
  
    </View>
  );
}
