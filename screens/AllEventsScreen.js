import Create from "../components/create";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, Image, Button, FAB } from "react-native-elements";
import { connect } from "react-redux";

const handleDelete = (value) => {
  console.log(value);

  const body = {
    eventID: value,
  };

  fetch(
    "http://localhost:3000/delete-event?eventID=" + value,
    {
      method: "DELETE",
    }
  );
};

function myEvents(props) {
  const [myEventList, setMyEventList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => setMyEventList(data));

    console.log("EventCount" + props.eventCount);
  }, [props.eventCount]);

  let eventList = myEventList.map((event, i) => {
    //TODO Reducer to put in place to receive location from user

    //? to calculate distance from our location to the event
    // var dis = (
    //   getDistance(
    //     { latitude: location.lat, longitude: location.long },
    //     { latitude: event.lat, longitude: event.long }
    //   ) / 1000
    // ).toFixed(1);

    //? Convert UTC date to a dd/mm/yy date
    var d = new Date(event.date);
    var date = d.toLocaleDateString();

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate("EventDetail", {
            screen: "EventDetailScreen",
            event: event,
          });
        }}
      >
        <Card borderRadius={15} containerStyle={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Image
                style={{ borderRadius: 10, height: 120, width: 120 }}
                source={{ uri: event.image }}
              />
            </View>
            <View
              style={styles.cardRightsideView}
            >
              <View
                style={{
                  flex: 0.5,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={styles.cardText}
                >
                  {event.name}
                </Text>
              </View>
              <View
                style={styles.viewInsideCard}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.locationIcon}
                    source={require("../assets/location.png")}
                  />
                  <Text
                    style={styles.kmNumberText}
                  >
                    {" "}
                    1.4
                  </Text>
                  <Text
                    style={styles.kmText}
                  >
                    Km away
                  </Text>
                </View>

                <View
                  style={styles.dateView}
                >
                  <Image
                    style={styles.cardIcon}
                    source={require("../assets/date.png")}
                  />
                  <Text
                    style={styles.dateText}
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

    //! ----------------------------------- MAIN RETURN -----------------------------------
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>{eventList}</ScrollView>
      <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 0,
        }}
      >
        <Button
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          icon={<Create props={props} />}
          onPress={() => {
            props.navigation.navigate("CreateEvent", {
              screen: "CreateEventScreen",
            });
          }}
        ></Button>
      </View>
    </View>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginBottom: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.95,
    border: "none",
  },
  cardText: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "flex-start",
  },
  viewInsideCard: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 5,
  },
  locationIcon: {
    height: 18,
    width: 15,
    marginRight: 3,
    marginTop: 5,
  },
  kmNumberText: {
    paddingTop: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  kmText: {
    paddingTop: 10,
    fontSize: 12,
    justifyContent: "flex-start",
  },
  buttonContainerStyle: {
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 35,
  },
  buttonStyle: {
    margin: 10,
    width: 52,
    height: 52,
    shadowRadius: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
  cardIcon: {
    height: 17,
    width: 17,
    marginRight: 3,
    marginTop: 0,
  },
  dateText: {
    paddingTop: 5,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  cardRightsideView: {
    flex: 1.2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }
});

function mapStateToProps(state) {
  return { eventCount: state.eventCount };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteOneEvent: function () {
      dispatch({ type: "delete" });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(myEvents);
