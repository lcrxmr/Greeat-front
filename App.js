import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Image} from 'react-native'
import {createStore, combineReducers} from 'redux';

// import {Provider} from 'react-redux';
const Tab = createBottomTabNavigator();

// const store = createStore(combineReducers({}));
const Stack = createStackNavigator();
const Tab2 = createMaterialTopTabNavigator();

import HomeScreen from './screens/HomeScreen'
import MyEvent from './screens/MyEventScreen'
import Recipe from './screens/RecipeScreen'
import Menu from './screens/MenuScreen'
import Map from './screens/MapScreen'
import Profile from './screens/Profile'
import MyEventsPublic from './screens/MyEventsPublic'
import MyRecipe from './screens/MyRecipe'

function BottomNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        if (route.name == 'Map') {
          return <Image source={require('./assets/favicon.png')} />
        } else if (route.name == 'Myevent') {
          return <Image source={require('./assets/favicon.png')} />
        } else if (route.name == 'Recipe') {
          return <Image source={require('./assets/favicon.png')} />
        } else if (route.name == 'Menu') {
          return <Image source={require('./assets/favicon.png')} />
        }
      },
      
      // Warning corrected due to previous code deprecated
        tabBarActiveTintColor: '#',
        tabBarInactiveTintColor: '#',
        sttabBarStyleyle: [{
          backgroundColor: '#',
          display: "flex"
        },
        null
      ]
      }
      )}
  
    

  >
    <Tab.Screen name="Map" component={Map} />
    <Tab.Screen name="Myevent" component={MyEvent} />
    <Tab.Screen name="Recipe" component={Recipe} />
    <Tab.Screen name="Menu" component={Menu} />
  </Tab.Navigator>
);
}


export default function App() {
return (

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileFromMenu" component={Profile} />
        <Stack.Screen name="MyEventsPublic" component={MyEventsPublic} />
        <Stack.Screen name="MyRecipe" component={MyRecipe}  />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>

);
}