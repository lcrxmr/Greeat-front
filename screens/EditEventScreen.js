import { PlusIcon } from './../components/plus-icon';
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableHighlight, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

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


    <View style={{ flex: 1 }}>

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
          style={styles.imageField}
        >
          <Button
            icon={
              <PlusIcon />
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

      </ScrollView>


      <View
        style={styles.bottomBar}
      >
        <TouchableHighlight onPress={() => {
          props.navigation.navigate("Event", { screen: "EventScreen" });
        }} >
          <Text
            style={styles.buttonCancel}
          >
            {" "}
            Cancel{" "}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {
            handleEdit(name, date, location, desc, Event);
            props.navigation.navigate("Event", { screen: "EventScreen" });
          }}
        >
          <Text
            style={styles.buttonCreate}
          >
            {" "}
            Update Event{" "}
          </Text>
        </TouchableHighlight>
      </View>

    </View>
  );
}

//! ------------------------- STYLES -------------------------

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
  buttonCreate: {
    alignItems: "center",
    backgroundColor: "#476A70",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "white",
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
  },
  buttonCancel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#011936",
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 20,
  },
  imageField: {
    alignItems: "center",
    margin: 10,
    padding: 30,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C5CBD3",
    borderRadius: 20,
  }
});
