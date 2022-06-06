import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const handleCreate = (name, date, location, desc) => {
  console.log(date);

  const body = {
    name: name,
    date: date,
    location: location,
    description: desc,
  };

  // console.log(body);
  /*  const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); */

<<<<<<< HEAD

  fetch('http://192.168.164.78:3000/create-event', {
    method: 'POST',
=======
  fetch("https://damp-mountain-22575.herokuapp.com/create-event", {
    method: "POST",
>>>>>>> dev
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

function CreateEvent(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [desc, setDesc] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));

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
    <ScrollView style={{ flex: 1 }}>
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
          Events Name
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          defaultValue=""
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
          placeholder="Describe your event in a few words"
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
            handleCreate(name, date, location, desc);
            props.navigation.navigate("Event", { screen: "EventScreen" });
          }}
        />

        <Button
          title="Create"
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
            props.navigation.navigate("Event", { screen: "EventScreen" });
            console.log("");
          }}
        />
      </View>
    </ScrollView>
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

function mapDispatchToProps(dispatch) {
  return {
    addOneEvent: function () {
      dispatch({ type: "add" });
    },
  };
}
export default connect(null, mapDispatchToProps)(CreateEvent);
