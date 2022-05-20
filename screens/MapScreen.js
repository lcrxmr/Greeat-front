import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

// Import map & marker
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import search autocomplete lib
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; // npm install react-native-google-places-autocomplete (if issues with npm add --legacy-peer-deps)
import { convertLegacyProps } from "antd/lib/button/button";
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
        /*  var rawResponse = await fetch(
           "http://192.168.1.173:3000/nearby-places",
           {
             method: "GET",
           }
         );
         places = await rawResponse.json();
         setListPins([places]); */

        // for (let i = 0; i < listPins.length; i++) {
        //   console.log("Data from fetch: ", listPins[i].placeName);
        // }
      }
    })();

    // Cleanup function
    return () => mounted = false

  }, []);

  console.log("------List of places fetched from back: ", listPins, "------");

  console.log(listPins[0])

  //? Display pins of nearby places around us on the map 
  /* pinsAroundMe = listPins.places.map((Pin, i) => {
    console.log("------Nearby place marker: ", Pin.coordinate.latitude, "------");
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

  console.log("------Pins around me:", pinsAroundMe, "------")
 */


  // //! Second solution to display pins of nearby places around us on the map 
  // var pinsAroundMe = listPins.map((Pin, index) => {
  //   console.log("------List of pins : ", Pin, "------");

  //   for(let markers in Pin){
  //     console.log("------Markers in Pin: ", Pin[markers], "------");

  //     console.log("------Pin length: ",Pin[markers].length,"------" )
  //     for(let i=10; i< 15; i++){
  //       console.log("------",i,"------")
  //       console.log("------Pin[markers][i]",Pin[markers][i],"------")
  //       console.log("------Marker in markers array: ", Pin[markers][0], "------");
  //       return (
  //         <Marker
  //           coordinate={{
  //             latitude: Pin[markers][i].coordinate.latitude,
  //             longitude: Pin[markers][i].coordinate.longitude,
  //           }}
  //           title={Pin[markers][i].placeName}
  //           description={Pin[markers][i].placeId}
  //           pinColor="#5c49eb"
  //           key={index}
  //         />
  //       );
  //       // console.log("------ Latitude:", Pin[markers][i].coordinate.latitude, "------")
  //       // console.log("------ Name:", Pin[markers][i].placeName, "------")
  //       // console.log("------ Name:", Pin[markers][i].placeId, "------")
  //     }

  //   }

  //  console.log("------Pins around me:",pinsAroundMe,"------")

  // });



  return (
    <View
      style={{
        flex: 1,
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

      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
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
