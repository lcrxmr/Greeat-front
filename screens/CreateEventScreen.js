import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from 'react-redux';

import DatePicker from 'react-native-date-picker'



const handleCreate = (name, date, location, desc) => {

  console.log(date)

  const body = {
    name: name,
    date: date,
    location: location,
    description: desc,


  };

  console.log(body)

  /*  const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); */


  fetch('http://172.16.190.131:3000/create-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });


}

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
    <View>
      <TextInput
        style={styles.input}
        defaultValue=''
        placeholder="Event's name"
        onChangeText={setName}
        value={name}
      //placeholder="Give a name to your event"
      />

      <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
        placeholder="Adress of the event"
      />

      <TextInput
        style={styles.input}
        onFocus={showDatepicker}
        onChangeText={text => setDate(new Date(text))}
        value={date.toLocaleDateString()}
        placeholder="Date"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onFocus={showTimepicker}
        onChangeText={setTime}
        value={time}
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




      <TextInput
        style={styles.input}
        onChangeText={setEvent}
        value={event}
        placeholder="Event Category"
      />

      <TextInput
        style={styles.inputDesc}
        onChangeText={setDesc}
        value={desc}
        placeholder="Description"
      />

      <Button
        title="Create event"
        titleStyle={{ fontSize: 8 }}
        containerStyle={{
          justifyContent: "center", //Centered horizontally
          alignItems: "center", //Centered vertically
          flex: 1,
          width: 30,
          height: 20,
        }}
        onPress={() => {

          handleCreate(name, date, location, desc)
          props.navigation.navigate("Event", { screen: "EventScreen" });

        }}
      />

      <Button
        title="Cancel"
        titleStyle={{ fontSize: 8, color: "white" }}
        containerStyle={{
          justifyContent: "center", //Centered horizontally
          alignItems: "center", //Centered vertically
          flex: 1,
          width: 30,
          height: 20,
        }}
        onPress={() => {
          /* props.navigation.navigate("MyEvent", { screen: "MyEventScreen" });
          console.log(""); */
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDesc: {
    height: 140,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addOneEvent: function () {
      dispatch({ type: 'add' })
    }
  }
}
export default connect(null, mapDispatchToProps)(CreateEvent);
