import ButtonArrow from "../components/button-arrow";
import Calendar from "../components/calendar";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { Card, Badge, Button } from "react-native-elements";
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
  }, []);


  useEffect(() => {
    (async () => {
      //? Fetch places from backend route /nearby-places
      await fetch("http://localhost:3000/nearby-places", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lat=${location.lat}&long=${location.long}`,
      });

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


  // Convert UTC date to a dd/mm/yy date
  var d = new Date(event.date);
  var date = d.toLocaleDateString();


  //? Loop to display images in participants slider
  //TODO v2 to replace with participants data

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
      style={styles.participantsSliderView}
    >
      <View style={styles.filter}>
        <Image
          source={profile[i]}
          style={styles.participantsImg}
        />
      </View>
    </View>
  );
}


  return (
    <ScrollView style={styles.scrollView}>
      {/* //! -------------------- Header image -------------------- */}

      <View style={styles.headerImgView}>
        <Image
          style={styles.headerImg}
          source={{ uri: event.image }}
        />
      </View>

      {/* //! -------------------- Card -------------------- */}

      <Card borderRadius={15} containerStyle={styles.card}>
        <View style={styles.cardInsideView}>
          <Text
            style={styles.eventName}
          >
            {event.name}
          </Text>
        </View>

        <Text style={styles.cardLine}>
          ____________________________________________________
        </Text>

        {/* //? -------------------- Km away & badge -------------------- */}

        <View style={styles.firstTextRowMainView}>
          <View
            style={styles.kmMainView}
          >
            <View
              style={styles.markerView}
            >
              <LocationMarker />
              <Text
                style={styles.distanceText}
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
          </View>
          <View
            style={styles.catMainView}
          >
            <Badge
              value="French cuisine"
              badgeStyle={styles.badgeStyle}
              textStyle={styles.badgeTextStyle}
            />
          </View>
        </View>

        {/* //? -------------------- Date -------------------- */}

        <View
          style={styles.dateMainView}
        >
          <View
            style={styles.calendarIconView}
          >
            <Calendar />
            <Text
              style={styles.dateText}
            >
              {" "}
              {date}
            </Text>
          </View>
        </View>

        {/* //? -------------------- Created by -------------------- */}

        <View style={styles.createdByMainView}>
          <Text
            style={styles.createdByText}
          >
            Created by: {event.creator}
          </Text>
          <Text
            style={styles.creatorText}
          >
            John Doe
          </Text>
        </View>
      </Card>

      {/* //! -------------------- Button -------------------- */}

      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={{
            marginTop: 25,
            shadowRadius: 10,
            backgroundColor: buttonColor,
            borderRadius: 25,
            paddingTop: 12,
            paddingBottom: 12,
          }}
          titleStyle={styles.buttonTextStyle}
          title={join}
          iconRight={true}
          icon={
            <ButtonArrow
              style={styles.buttonArrow}
            />
          }
          onPress={() => {
            onPressJoin();
          }}
        ></Button>
      </View>

      {/* //! -------------------- Participants -------------------- */}

      <View style={styles.participantsSliderMainView}>
        <Text
          style={styles.participantsTitle}
        >
          {" "}
          Participants{"    "}
        </Text>
        <Text
          style={styles.counter}
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
        style={styles.descriptionTitle}
      >
        {" "}
        Description{" "}
      </Text>
      <View
        style={styles.descriptionMainView}
      >
        <View
          style={styles.descriptionTextView}
        >
          <Text
            style={styles.descriptionText}
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
  participantsSliderView: {
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  participantsImg: {
    backgroundColor: "white",
    color: "grey",
    height: 50,
    width: 50,
    padding: 5,
    borderRadius:100
  },
  scrollView: { backgroundColor: "#FDFDFD" },
  headerImgView: { alignItems: "center", marginTop: 20 },
  headerImg: {
    borderRadius: 10,
    height: 220,
    width: Dimensions.get("window").width * 0.95,
  },
  cardInsideView: { alignItems: "flex-start", paddingLeft: 10 },
  eventName: {
    paddingTop: 0,
    fontWeight: "bold",
    fontSize: 24,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  cardLine: { paddingLeft: 10, fontWeight: "100", color: "#C5CBD3" },
  firstTextRowMainView: { flexDirection: "row", justifyContent: "center" },
  kmMainView: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15,
  },
  markerView: {
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
  kmAwayText: {
    paddingTop: 8,
    color: "#AEB1B5",
    fontSize: 12,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
 catMainView: {
    paddingTop: 12,
    flex: 0.5,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeStyle: {
    backgroundColor: "#476A70",
    height: 28,
    borderRadius: 20,
  },
  badgeTextStyle: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },
  dateMainView: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
    marginTop: -4,
  },
  calendarIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  dateText: {
    paddingTop: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
    fontFamily: "Poppins_400Regular",
  },
  createdByMainView: { flexDirection: "row", alignItems: "center" },
  createdByText: {
    paddingTop: 2,
    fontSize: 12,
    justifyContent: "flex-start",
    opacity: 0.4,
    fontFamily: "Poppins_400Regular",
    paddingLeft: 15,
  },
  creatorText: {
    paddingTop: 0,
    fontWeight: "400",
    fontSize: 16,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  buttonView: { alignItems: "center" },
  buttonContainerStyle: {
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 25,
    width: "auto",
  },
  buttonTextStyle: {
    marginLeft: 32,
    marginRight: 8,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
  buttonArrow: {
    marginRight: 32,
  },
  participantsSliderMainView: { flexDirection: "row", alignItems: "flex-end", marginTop: 5, },
  participantsTitle: {
    marginTop: 30,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  counter: {
    fontWeight: "400",
    fontSize: 16,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  descriptionTitle: {
    alignItems: "flex-start",
    marginTop: 15,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  descriptionMainView: {
    marginTop: 10,
  },
  descriptionTextView: {
    flex: 0.5,
    alignItems: "flex-start",
    marginLeft: 10,
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
    paddingBottom: 20,
  },
});
