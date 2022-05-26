import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

// import {Provider} from 'react-redux';
const Tab = createBottomTabNavigator();

// const store = createStore(combineReducers({}));
const Stack = createStackNavigator();
const Tab2 = createMaterialTopTabNavigator();

import HomeScreen from './screens/HomeScreen'
import MyEvent from './screens/EventScreen'
import Recipe from './screens/RecipeScreen'
import Menu from './screens/MenuScreen'
import Map from './screens/MapScreen'
import Profile from './screens/Profile'
import MyEventsPublic from './screens/MyEventsPublic'
import MyRecipe from './screens/MyRecipe'
import MyRecipes from './screens/MyRecipesScreen'
import EditProfil from "./screens/editProfilScreen"
import RecipeDetails from "./screens/RecipeDetailsScreen"
import CreateRecipeScreen from "./screens/CreateRecipeScreen"
import EditRecipeScreen from "./screens/EditRecipeScreen"
import CreateEventScreen from "./screens/CreateEventScreen"
import EditEventScreen from "./screens/EditEventScreen"
import EventDetailsScreen from "./screens/EventDetailsScreen"
import MyEventsScreen from "./screens/MyEventsScreen"
import Event from "./screens/EventScreen"





import eventCount from './reducers/eventCount';
import recipeCount from './reducers/recipeCount';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ recipeCount, eventCount }));


function BottomNavigator() {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name == 'Map') {
            return <Image source={require('./assets/Map.png')} />
          } else if (route.name == 'Myevent') {
            return <Image source={require('./assets/Events.png')} />
          } else if (route.name == 'Recipe') {
            return <Image source={require('./assets/Recipes.png')} />
          } else if (route.name == 'Menu') {
            return <Image source={require('./assets/Other.png')} />
          }
        },

        tabBarHideOnKeyboard: true,
        // Warning corrected due to previous code deprecated

        tabBarActiveTintColor: '#000000', //? Use a real color code, not only #
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: [{
          backgroundColor: '#ffffff',
          display: "flex"
        },
          null
        ]
      }
      )}

    >
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="My Event" component={MyEvent} />
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileFromMenu" component={Profile} />
          <Stack.Screen name="MyEventsPublic" component={MyEventsPublic} />
          <Stack.Screen name="MyRecipe" component={MyRecipe} />
          <Stack.Screen name="editProfil" component={EditProfil} />
          <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />

          <Stack.Screen name="MyEvents" component={MyEventsScreen} />

          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="EditEvent" component={EditEventScreen} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="Event" component={Event} />




          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}