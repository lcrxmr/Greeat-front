import React, { useState } from "react"
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { useEffect } from "react/cjs/react.production.min";
import { connect } from 'react-redux';
import DateTimePicker from "@react-native-community/datetimepicker";


import SelectDropdown from 'react-native-select-dropdown'




const handleEdit = (name, date, location, desc, event) => {

    console.log(desc)

    const body = {
        _id: event._id,
        name: name,
        date: date,
        location: location,
        description: desc,

    };

    console.log(body)

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

    fetch('http://172.17.188.2:3000/edit-event', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });


}

export default function CreateEvent(props) {

    var Event = props.route.params.event
    console.log(Event)

    var eventDate = new Date(Event.date)
    console.log(eventDate)

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
            <TextInput
                style={styles.input}
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
                onChangeText={setDate}
                value={date.toLocaleDateString()}
                placeholder="Date"
                keyboardType="numeric"
            />
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
                title="Edit event"
                titleStyle={{ fontSize: 8 }}
                containerStyle={{
                    justifyContent: "center", //Centered horizontally
                    alignItems: "center", //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20,
                }}
                onPress={() => {

                    handleEdit(name, date, location, desc, Event)
                    props.navigation.navigate("Event", { screen: "MyEventsScreen" });

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



    )

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputDesc: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

