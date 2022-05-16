import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Card} from 'react-native';
import {Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Image} from 'react-native'
import {createStore, combineReducers} from 'redux';

import Profile from './Profile'

const Stack = createStackNavigator();

export default function Menu(props) {
    return (

      <ScrollView style={{ flex: 1 }}>
      <View>
        <Button title='Profile' onPress={() => {
          props.navigation.navigate("ProfileFromMenu", { screen: "Profile" })
        }}></Button>
        <Button title='Notifications' onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Menu" })
        }}></Button>
        <Button title='Wishlist' onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Menu" })
        }}></Button>
        <Button title='Chat' onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Menu" })
        }}></Button>
        <Button title='Settings' onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Menu" })
        }}></Button>
         <Button title='Logout' onPress={() => {
          props.navigation.navigate("Home", { screen: "HomeScreen" })
        }}></Button>
      </View>
  </ScrollView>

    );
    }