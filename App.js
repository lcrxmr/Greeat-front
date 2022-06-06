import { MenuIcon } from "./components/menu-icon";
import { MenuFocused } from "./components/menu-focused";
import { RecipesIcon } from "./components/recipes-icon";
import { RecipesFocused } from "./components/recipes-focused";
import { EventsIcon } from "./components/events-icon";
import { EventsFocused } from "./components/events-focused";
import { MapIcon } from "./components/map-icon";
import { MapFocused } from "./components/map-focused";
import { Logo } from "./components/logo";
import Search from "./components/search";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "react-native";
import { createStore, combineReducers } from "redux";
import { provider, Provider } from "react-redux";
import token from "./reducers/token";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
// const store = createStore(combineReducers({}));
const Stack = createStackNavigator();
const Tab2 = createMaterialTopTabNavigator();

import MyEvent from "./screens/EventScreen";
import Recipe from "./screens/RecipeScreen";
import Menu from "./screens/MenuScreen";
import Map from "./screens/MapScreen";
import Profile from "./screens/Profile";
import EditProfileScreen from "./screens/EditProfileScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen";
import CreateRecipeScreen from "./screens/CreateRecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import EditEventScreen from "./screens/EditEventScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import MyEventsScreen from "./screens/MyEventsScreen";
import Event from "./screens/EventScreen";
import RestaurantDetailScreen from "./screens/RestaurantDetailScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgetPassword from "./screens/ForgetPasswordScreen";

// Import reducers
import eventCount from "./reducers/eventCount";
import recipeCount from "./reducers/recipeCount";

const store = createStore(combineReducers({ token, eventCount, recipeCount }));

// Bottom navigation
function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          if (route.name == "Map") {
            if (focused) {
              return <MapFocused />;
            } else {
              return <MapIcon />;
            }
          } else if (route.name == "Events") {
            if (focused) {
              return <EventsFocused />;
            } else {
              return <EventsIcon />;
            }
          } else if (route.name == "Recipes") {
            if (focused) {
              return <RecipesFocused />;
            } else {
              return <RecipesIcon />;
            }
          } else if (route.name == "Menu") {
            if (focused) {
              return <MenuFocused />;
            } else {
              return <MenuIcon />;
            }
          }
        },

        tabBarHideOnKeyboard: true, // Warning corrected due to previous code deprecated
        tabBarActiveTintColor: "#011936", // Use a real color code, not only #
        tabBarInactiveTintColor: "#AEB1B5",
        tabBarStyle: [
          {
            backgroundColor: "#FDFDFD",
            display: "flex",
            height: 72,
            paddingTop: 5,
            paddingBottom: 11,
          },
          null,
        ],
        focused: true,
        showIcon: true,
      })}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => <Search />,
          headerStyle: {
            height: 110,
            backgroundColor: "#FDFDFD",
          },
        }}
      />
      <Tab.Screen name="Events" component={MyEvent} />
      <Tab.Screen name="Recipes" component={Recipe} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}

// Main navigation component
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen
            name="ProfileFromMenu"
            component={Profile}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="RestaurantDetailScreen"
            component={RestaurantDetailScreen}
          />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
          <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
          <Stack.Screen name="MyEvents" component={MyEventsScreen} />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            headerTransparent={true}
          />
          <Stack.Screen name="EditEvent" component={EditEventScreen} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
