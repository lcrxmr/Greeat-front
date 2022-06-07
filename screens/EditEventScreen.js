import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { useEffect } from "react/cjs/react.production.min";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

import SelectDropdown from "react-native-select-dropdown";

const handleEdit = (name, date, location, desc, event) => {
  console.log(desc);

  const body = {
    _id: event._id,
    name: name,
    date: date,
    location: location,
    description: desc,
  };

  console.log(body);

  /* const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); */
  /* 
      console.log('stringified' + JSON.stringify(body))
      console.log('unstringified' + JSON.parse(JSON.stringify(body))) */

  /* fetch('http://172.17.188.13:3000/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    }); */

  fetch('https://damp-mountain-22575.herokuapp.com/edit-event', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });


}

export default function CreateEvent(props) {
  var Event = props.route.params.event;
  console.log(Event);

  var eventDate = new Date(Event.date);
  console.log(eventDate);

  const [name, setName] = useState(Event.name);
  const [location, setLocation] = useState(Event.location);
  const [event, setEvent] = useState("");
  const [desc, setDesc] = useState(Event.desc);

  const [date, setDate] = useState(eventDate);
  const [time, setTime] = useState(eventDate);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    console.log(date);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 12,
          opacity: 0.3,
          marginLeft: 10,
        }}
      >
        {" "}
        Images{" "}
      </Text>
      <View
        style={{
          alignItems: "center",
          margin: 10,
          padding: 30,
          borderStyle: "dashed",
          borderWidth: 1,
          borderColor: "#C5CBD3",
          borderRadius: 20,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          icon={
            <Svg
              id="Component_50_4"
              data-name="Component 50 \u2013 4"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={20}
              height={20}
              viewBox="0 0 16 16"
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
              <Path
                id="Path_900"
                data-name="Path 900"
                d="M19.857,14.143H14.143v5.714a1.143,1.143,0,0,1-2.286,0V14.143H6.143a1.143,1.143,0,1,1,0-2.286h5.714V6.143a1.143,1.143,0,1,1,2.286,0v5.714h5.714a1.143,1.143,0,0,1,0,2.286Z"
                transform="translate(-5 -5)"
                fill="url(#linear-gradient)"
              />
            </Svg>
          }
          buttonStyle={{
            backgroundColor: null,
          }}
        ></Button>
      </View>
      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Event's name
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Event's name"
          onChangeText={setName}
          value={name}
        //placeholder="Give a name to your event"
        />
      </View>

      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Adress of the event
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder="Adress of the event"
        />
      </View>
      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Date
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          onFocus={showDatepicker}
          onChangeText={setDate}
          value={date.toLocaleDateString()}
          placeholder="Date"
          keyboardType="numeric"
        />
      </View>

      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Time
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          onFocus={showTimepicker}
          onChangeText={setTime}
          value={date.toLocaleTimeString()}
          placeholder="Time"
          keyboardType="numeric"
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>

      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Event Category
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          onChangeText={setEvent}
          value={event}
          placeholder="Event Category"
        />
      </View>

      <View style={{ alignItems: "flex-start", marginLeft: 15, marginTop: 10 }}>
        <Text style={{ fontWeight: "500", fontSize: 12, opacity: 0.3 }}>
          Description
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.inputDesc}
          onChangeText={setDesc}
          value={desc}
          placeholder="Description"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: 15,
          marginTop: 10,
        }}
      >
        <Button
          title="Cancel"
          titleStyle={{ fontSize: 18, color: "#476A70" }}
          buttonStyle={{
            marginTop: 20,
            marginRight: -20,
            width: 150,
            height: 50,
            shadowRadius: 10,
            backgroundColor: null,
            borderRadius: 25,
          }}
          onPress={() => {
            props.navigation.navigate("Event", { screen: "EventScreen" });
          }}
        />
        <Button
          title="Update"
          titleStyle={{ fontSize: 18, color: "white" }}
          buttonStyle={{
            marginTop: 20,
            width: 150,
            height: 50,
            shadowRadius: 10,
            backgroundColor: "#476A70",
            borderRadius: 25,
          }}
          onPress={() => {
            handleEdit(name, date, location, desc, Event);
            props.navigation.navigate("Event", { screen: "EventScreen" });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputDesc: {
    marginTop: 5,
    borderWidth: 0,
    height: 100,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#00000012",
    borderColor: "white",
    width: 370,
  },
  input: {
    marginTop: 5,
    borderWidth: 0,
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#00000012",
    borderColor: "white",
    width: 370,
  },
  screen: {
    backgroundColor: "white",
  },
  fieldName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#AEB1B5",
    marginLeft: 10,
    marginTop: 10,
  },
  inputText: {
    fontSize: 12,
    color: "#8A8C90",
    marginLeft: 20,
    marginTop: 10,
  },
});
