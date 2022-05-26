import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Image, Button, FAB } from 'react-native-elements'
import { connect } from 'react-redux';



const handleDelete = (value) => {

  console.log(value)

  const body = {
    eventID: value,

  };

  fetch('http://172.16.190.132:3000/delete-event?eventID=' + value, { method: 'DELETE' })


}

function Event(props) {



  const [myEventList, setMyEventList] = useState([]);
  const [eventCount, setEventCount] = useState(0);


  useEffect(() => {

    fetch("http://172.17.188.13:3000/events")
      .then(response => response.json())
      .then(data => setMyEventList(data))


    console.log('EventCount' + props.eventCount)

  }, [props.eventCount])


  let eventList = myEventList.map((event, i) => {

    return (
      <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}
      >
        <Image
          style={{ width: 100, height: 100, }}
          source={require('../assets/favicon.png')}
          onPress={() => {

            props.navigation.navigate("EventDetails", { screen: "EventDetailsScreen", event: event })


          }} />
        <Text style={{ width: '30%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>{event.name}</Text>

        <Button title="Edit"

          onPress={() => {
            props.navigation.navigate("EditEvent", { screen: "EditEventScreen", event: event })
          }}
          titleStyle={{ fontSize: 5 }} containerStyle={{
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
            flex: 1,
            width: 40,
            height: 30

          }} />
        <Button title="Supprimer"


          onPress={() => {
            handleDelete(event._id);
            props.deleteOneEvent();

          }

          }
          titleStyle={{ fontSize: 5 }} containerStyle={{
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
            flex: 1,
            width: 40,
            height: 30

          }} />
      </View>

    )
  })




  return (

    <ScrollView style={{ flex: 1 }}>
      {eventList}

      <FAB title="Create" color='blue' onPress={() => {

        props.navigation.navigate("CreateEvent", { screen: "CreateEventScreen" })


      }}
      />

    </ScrollView>

  )
}

function mapStateToProps(state) {
  return { eventCount: state.eventCount }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteOneEvent: function () {
      dispatch({ type: 'delete' })
    }


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Event);