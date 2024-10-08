import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Card, Badge } from "react-native-elements";
import { getDistance } from "geolib";
import GoldStar from "../components/GoldStar";
import GreyStar from "../components/GreyStar";
import LocationMarker from "../components/LocationMarker";
import ArrowRestaurantDetailsMap from "../components/ArrowRestaurantDetailsMap";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function EventDetails({ route }, props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
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
      await fetch("http://localhost:3000/nearby-places", {
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
    ) / 1000 // on divise le résultat par 1000 pour convertir les mètres en kilomètres
  ).toFixed(1); //toFixed(1) pour fixé le nombre à une seule décimale
  

  console.log(dis);
  // console.log(restaurant.gallery[0])
  return (
    <ScrollView style={{ backgroundColor: "#FDFDFD" }}>
      {/* //! -------------------- Header image -------------------- */}

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={styles.restaurantImage}
          source={{ uri: restaurant.gallery[0] }}
        />
      </View>

      {/* //! -------------------- Reviews -------------------- */}

      <View
        style={styles.starView}
      >
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GreyStar />
        <Text
          style={styles.rating}
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
            style={styles.viewInsideCard}
          >
            <View
              style={styles.distanceView}
            >
              <LocationMarker />
              <Text
                style={styles.distanceText}
              >
                {" "}
                {dis}
              </Text>
              <Text
                style={styles.kmText}
              >
                Km away
              </Text>
            </View>
          </View>
          <View
            style={styles.badgeView}
          >
            <Badge
              value="French cuisine"
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
            />
          </View>
        </View>
      </Card>

      {/* //! -------------------- Location -------------------- */}

      <Text
        style={styles.locationText}
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
          style={styles.addressView}
        >
          <Text
            style={styles.addressText}
          >
            3 Rue de la Vergouille, 69003, Lyon. France
          </Text>

          <View
            style={styles.viewMap}
          >
            <ArrowRestaurantDetailsMap />
          </View>
        </View>

        <View />

        {/* //! -------------------- Description -------------------- */}

        <Text
          style={styles.descriptionTitle}
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
              style={styles.descriptionText}
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
  starView: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  restaurantImage: {
    borderRadius: 10,
    height: 220,
    width: Dimensions.get("window").width * 0.95,
  },
  rating: {
    paddingTop: 5,
    fontSize: 20,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 5,
    marginLeft: 8,
  },
  viewInsideCard: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 15,
  },
  distanceView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  distanceText: {
    paddingTop: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
    fontFamily: "Poppins_400Regular",
  },
  kmText: {
    paddingTop: 8,
    color: "#AEB1B5",
    fontSize: 12,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  badgeView: {
    flex: 0.5,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "#476A70",
    height: 28,
    borderRadius: 20,
  },
  badgeText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },
  locationText: {
    alignItems: "flex-start",
    marginTop: 25,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  addressView:{
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 30,
  },
  addressText: {
    flex: 0.5,
    lineHeight: 22,
    marginLeft: 40,
    fontFamily: "Poppins_400Regular",
  },
  viewMap: {
    flex: 0.5,
    alignItems: "flex-end",
    marginRight: 50,
    marginTop: 10,
  },
  descriptionTitle: {
    alignItems: "flex-start",
    marginTop: 25,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  descriptionText: {
    fontSize: 16,
    justifyContent: "flex-start",
    marginLeft: 8,
    marginBottom: 3,
    marginRight: 10,
    color: "#011936",
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  }
});
