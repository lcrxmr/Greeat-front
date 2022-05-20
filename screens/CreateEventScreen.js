import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

//import DatePicker from 'react-native-date-picker'

export default function CreateEvent(props) {
  const [text, setText] = useState("");
  const [adress, setAdress] = useState("");
  const [event, setEvent] = useState("");
  const [desc, setDesc] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
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
        onChangeText={setText}
        value={text}
        placeholder="Give a name to your event"
      />

      <TextInput
        style={styles.input}
        onChangeText={setAdress}
        value={adress}
        placeholder="Adress of the event"
      />

      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Time and date"
        keyboardType="numeric"
      />

      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        <Text>selected: {date.toLocaleString()}</Text>
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

      {/* <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}

      <TextInput
        style={styles.input}
        onChangeText={setEvent}
        value={event}
        placeholder="Event Cathegory"
      />

      <TextInput
        style={styles.inputDesc}
        onChangeText={setDesc}
        value={desc}
        placeholder="Description"
      />

      <Button
        title="Creat even"
        titleStyle={{ fontSize: 8 }}
        containerStyle={{
          justifyContent: "center", //Centered horizontally
          alignItems: "center", //Centered vertically
          flex: 1,
          width: 30,
          height: 20,
        }}
        onPress={() => {
          props.navigation.navigate("MyEvent", { screen: "MyEventScreen" });
          console.log("");
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
          props.navigation.navigate("MyEvent", { screen: "MyEventScreen" });
          console.log("");
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
