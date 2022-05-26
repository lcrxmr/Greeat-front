import {Logo} from './components/logo';
import Search from './components/search';
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
import Svg, {
  G,
  Path,
  Circle,
  Rect,
  Defs,
  Stop,
  LinearGradient,
  TSpan,
  Text,
} from "react-native-svg";
// import SvgUri from 'react-native-svg-uri-updated';
import token from "./reducers/token";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();


const Tab = createBottomTabNavigator();
// const store = createStore(combineReducers({}));
const Stack = createStackNavigator();
const Tab2 = createMaterialTopTabNavigator();

import MyEvent from './screens/EventScreen'
import Recipe from './screens/RecipeScreen'
import Menu from './screens/MenuScreen'
import Map from './screens/MapScreen'
import Profile from './screens/Profile'
import EditProfileScreen from "./screens/EditProfileScreen"
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen"
import CreateRecipeScreen from "./screens/CreateRecipeScreen"
import EditRecipeScreen from "./screens/EditRecipeScreen"
import CreateEventScreen from "./screens/CreateEventScreen"
import EditEventScreen from "./screens/EditEventScreen"
import MyEventsScreen from "./screens/MyEventsScreen"
import Event from "./screens/EventScreen"

import eventCount from './reducers/eventCount';
import recipeCount from './reducers/recipeCount';



import RestaurantDetailScreen from "./screens/RestaurantDetailScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgetPassword from "./screens/ForgetPasswordScreen";
// import MapScreen from "./screens/MapScreen";


import EventDetailScreen from './screens/EventDetailScreen'
import RestaurantListScreen from './screens/RestaurantListScreen'

const store = createStore(combineReducers({ token }));



function BottomNavigator() {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          if (route.name == "Map") {

            if (focused) {

              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                >
                  <Defs>
                    <LinearGradient
                      id="linear-gradient"
                      x2="1"
                      y1="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <Stop offset="0" stopColor="#bcea64"></Stop>
                      <Stop offset="1" stopColor="#80c35f"></Stop>
                    </LinearGradient>
                  </Defs>
                  <G data-name="Group 47015" transform="translate(-28 -5)">
                    <Circle
                      cx="23"
                      cy="23"
                      r="23"
                      fill="#f4f6f8"
                      data-name="Ellipse 180"
                      transform="translate(28 5)"
                    ></Circle>
                    <G
                      data-name="Group 327"
                      transform="translate(-138.078 -10.958)"
                    >
                      <G
                        data-name="Group 326"
                        transform="translate(178.947 26.429)"
                      >
                        <Circle
                          cx="5.5"
                          cy="5.5"
                          r="5.5"
                          fill="#011936"
                          data-name="Ellipse 34"
                          transform="translate(12.67)"
                        ></Circle>
                        <Path
                          fill="url(#linear-gradient)"
                          d="M9.631 24.685c-.508 0-2.258-1.462-3.983-3.328a23.911 23.911 0 01-4.562-6.623A12.427 12.427 0 010 10.078 9.873 9.873 0 019.631 0a9.874 9.874 0 019.632 10.078 12.222 12.222 0 01-1.163 4.8c-1.732 4.022-7.391 9.807-8.469 9.807zm.16-19.121a3.884 3.884 0 103.858 3.883 3.875 3.875 0 00-3.858-3.882z"
                          data-name="Subtraction 2"
                          transform="translate(0 1.63)"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.263"
                  height="24.685"
                  viewBox="0 0 19.263 24.685"
                >
                  <G
                    data-name="Group 327"
                    transform="translate(-178.947 -28.059)"
                  >
                    <G
                      data-name="Group 326"
                      transform="translate(178.947 26.429)"
                    >
                      <Path
                        fill="#8a8c90"
                        d="M9.631 24.685c-.508 0-2.257-1.462-3.982-3.328a23.915 23.915 0 01-4.561-6.623A12.422 12.422 0 010 10.078 9.873 9.873 0 019.631 0a9.874 9.874 0 019.632 10.078 12.211 12.211 0 01-1.163 4.8c-1.732 4.022-7.391 9.807-8.469 9.807zm.16-19.121a3.883 3.883 0 103.858 3.884 3.875 3.875 0 00-3.858-3.883z"
                        data-name="Subtraction 2"
                        transform="translate(0 1.63)"
                      ></Path>
                    </G>
                  </G>
                </Svg>
              );
            }
          } else if (route.name == "Myevent") {
            if (focused) {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={46}
                  height={46}
                  viewBox="0 0 46 46"
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
                  <G
                    id="Group_47016"
                    data-name="Group 47016"
                    transform="translate(-119 -5)"
                  >
                    <Circle
                      id="Ellipse_192"
                      data-name="Ellipse 192"
                      cx={23}
                      cy={23}
                      r={23}
                      transform="translate(119 5)"
                      fill="#f4f6f8"
                    />
                    <G id="Group_674" data-name="Group 674">
                      <Rect
                        id="Rectangle_3353"
                        data-name="Rectangle 3353"
                        width={21}
                        height={19}
                        rx={3}
                        transform="translate(131 20)"
                        fill="url(#linear-gradient)"
                      />
                      <Circle
                        id="Ellipse_179"
                        data-name="Ellipse 179"
                        cx={6}
                        cy={6}
                        r={6}
                        transform="translate(141 28)"
                        fill="#011936"
                      />
                      <Path
                        id="Path_1344"
                        data-name="Path 1344"
                        d="M16.941,14a.941.941,0,0,1,.941.941v1.492l1.136,1.136a.941.941,0,1,1-1.33,1.33l-1.411-1.411A.941.941,0,0,1,16,16.822V14.941A.941.941,0,0,1,16.941,14Z"
                        transform="translate(129.747 16.813)"
                        fill="#80c35f"
                        fillRule="evenodd"
                      />
                      <Path
                        id="Path_1345"
                        data-name="Path 1345"
                        d="M6.941,2a.941.941,0,0,1,.941.941V4.822A.941.941,0,1,1,6,4.822V2.941A.941.941,0,0,1,6.941,2Z"
                        transform="translate(129.179 16)"
                        fill="#476a70"
                        fillRule="evenodd"
                      />
                      <Path
                        id="Path_1346"
                        data-name="Path 1346"
                        d="M16.941,2a.941.941,0,0,1,.941.941V4.822a.941.941,0,1,1-1.882,0V2.941A.941.941,0,0,1,16.941,2Z"
                        transform="translate(129.624 16)"
                        fill="#476a70"
                        fillRule="evenodd"
                      />
                    </G>
                  </G>
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <G data-name="Group 654" transform="translate(-131 -21)">
                    <Rect
                      width="21"
                      height="19"
                      fill="#8a8c90"
                      data-name="Rectangle 3353"
                      rx="3"
                      transform="translate(131 23)"
                    ></Rect>
                    <Circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill="#c5cbd3"
                      data-name="Ellipse 179"
                      transform="translate(141 31)"
                    ></Circle>
                    <Path
                      fill="#8a8c90"
                      fillRule="evenodd"
                      d="M16.941 14a.941.941 0 01.941.941v1.492l1.136 1.136a.941.941 0 11-1.33 1.33l-1.411-1.411a.941.941 0 01-.277-.666v-1.881a.941.941 0 01.941-.941z"
                      data-name="Path 1344"
                      transform="translate(129.747 19.813)"
                    ></Path>
                    <Path
                      fill="#c5cbd3"
                      fillRule="evenodd"
                      d="M6.941 2a.941.941 0 01.941.941v1.881a.941.941 0 11-1.882 0V2.941A.941.941 0 016.941 2z"
                      data-name="Path 1345"
                      transform="translate(129.179 19)"
                    ></Path>
                    <Path
                      fill="#c5cbd3"
                      fillRule="evenodd"
                      d="M16.941 2a.941.941 0 01.941.941v1.881a.941.941 0 11-1.882 0V2.941A.941.941 0 0116.941 2z"
                      data-name="Path 1346"
                      transform="translate(129.624 19)"
                    ></Path>
                  </G>
                </Svg>
              );
            }
          } else if (route.name == "Recipe") {
            if (focused) {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={46}
                  height={46}
                  viewBox="0 0 46 46"
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
                  <G
                    id="Group_47018"
                    data-name="Group 47018"
                    transform="translate(-208 -5)"
                  >
                    <Circle
                      id="Ellipse_193"
                      data-name="Ellipse 193"
                      cx={23}
                      cy={23}
                      r={23}
                      transform="translate(208 5)"
                      fill="#f4f6f8"
                    />
                    <Circle
                      id="Ellipse_194"
                      data-name="Ellipse 194"
                      cx={5.5}
                      cy={5.5}
                      r={5.5}
                      transform="translate(234.539 15.47)"
                      fill="#011936"
                    />
                    <G
                      id="Group_47017"
                      data-name="Group 47017"
                      transform="translate(0 -3)"
                    >
                      <Path
                        id="Path_1281"
                        data-name="Path 1281"
                        d="M5.3,4A3.327,3.327,0,0,0,2,7.353V18.529a3.327,3.327,0,0,0,3.3,3.353H8.629a6.506,6.506,0,0,1,2.087.344L13,23l2.284-.774a6.506,6.506,0,0,1,2.087-.344H20.7A3.327,3.327,0,0,0,24,18.529V7.353A3.327,3.327,0,0,0,20.7,4H16.3A4.36,4.36,0,0,0,13,5.513,4.36,4.36,0,0,0,9.7,4Z"
                        transform="translate(218 19)"
                        fillRule="evenodd"
                        fill="url(#linear-gradient)"
                      />
                      <Path
                        id="Path_1282"
                        data-name="Path 1282"
                        d="M2,7.353A3.327,3.327,0,0,1,5.3,4H9.7A4.36,4.36,0,0,1,13,5.513V23l-2.284-.774a6.506,6.506,0,0,0-2.087-.344H5.3A3.327,3.327,0,0,1,2,18.529Z"
                        transform="translate(218 19)"
                        fill="#476a70"
                        fillRule="evenodd"
                      />
                    </G>
                  </G>
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="19"
                  viewBox="0 0 22 19"
                >
                  <G
                    fillRule="evenodd"
                    data-name="Group 655"
                    transform="translate(-220 -23)"
                  >
                    <Path
                      fill="#c5cbd3"
                      d="M5.3 4A3.327 3.327 0 002 7.353v11.176a3.327 3.327 0 003.3 3.353h3.329a6.506 6.506 0 012.087.344L13 23l2.284-.774a6.506 6.506 0 012.087-.344H20.7a3.327 3.327 0 003.3-3.353V7.353A3.327 3.327 0 0020.7 4h-4.4A4.36 4.36 0 0013 5.513 4.36 4.36 0 009.7 4z"
                      data-name="Path 1281"
                      transform="translate(218 19)"
                    ></Path>
                    <Path
                      fill="#8a8c90"
                      d="M2 7.353A3.327 3.327 0 015.3 4h4.4A4.36 4.36 0 0113 5.513V23l-2.284-.774a6.506 6.506 0 00-2.087-.344H5.3A3.327 3.327 0 012 18.529z"
                      data-name="Path 1282"
                      transform="translate(218 19)"
                    ></Path>
                  </G>
                </Svg>
              );
            }
          } else if (route.name == "Menu") {
            if (focused) {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={46}
                  height={46}
                  viewBox="0 0 46 46"
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
                  <G
                    id="Group_47019"
                    data-name="Group 47019"
                    transform="translate(-299 -5)"
                  >
                    <Circle
                      id="Ellipse_193"
                      data-name="Ellipse 193"
                      cx={23}
                      cy={23}
                      r={23}
                      transform="translate(299 5)"
                      fill="#f4f6f8"
                    />
                    <G
                      id="Group_673"
                      data-name="Group 673"
                      transform="translate(0 -4)"
                    >
                      <Rect
                        id="Rectangle_3344"
                        data-name="Rectangle 3344"
                        width={20}
                        height={20}
                        transform="translate(313 22)"
                        fill="none"
                      />
                      <G id="group" transform="translate(310.716 21)">
                        <Circle
                          id="Ellipse_171"
                          data-name="Ellipse 171"
                          cx={4}
                          cy={4}
                          r={4}
                          transform="translate(10.284 2)"
                          fill="#011936"
                        />
                        <Path
                          id="Path_1314"
                          data-name="Path 1314"
                          d="M12,13a6,6,0,0,0-6,6,2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V18a5,5,0,0,0-5-5Z"
                          transform="translate(0.284 -1)"
                          fill="#476a70"
                        />
                        <Path
                          id="Path_1315"
                          data-name="Path 1315"
                          d="M7,13a5,5,0,0,0-5,5v1a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V18a5,5,0,0,0-5-5Z"
                          transform="translate(-2 -1)"
                          fill="url(#linear-gradient)"
                        />
                        <Circle
                          id="Ellipse_172"
                          data-name="Ellipse 172"
                          cx={4}
                          cy={4}
                          r={4}
                          transform="translate(4.284 2)"
                          fill="url(#linear-gradient)"
                        />
                      </G>
                    </G>
                  </G>
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22.284"
                  height="20"
                  viewBox="0 0 22.284 20"
                >
                  <G data-name="Group 673" transform="translate(-310.716 -22)">
                    <Path
                      fill="none"
                      d="M0 0H20V20H0z"
                      data-name="Rectangle 3344"
                      transform="translate(313 22)"
                    ></Path>
                    <G transform="translate(310.716 21)">
                      <Circle
                        cx="4"
                        cy="4"
                        r="4"
                        fill="#c5cbd3"
                        data-name="Ellipse 171"
                        transform="translate(10.284 2)"
                      ></Circle>
                      <Path
                        fill="#c5cbd3"
                        d="M12 13a6 6 0 00-6 6 2 2 0 002 2h12a2 2 0 002-2v-1a5 5 0 00-5-5z"
                        data-name="Path 1314"
                        transform="translate(.284 -1)"
                      ></Path>
                      <Path
                        fill="#8a8c90"
                        d="M7 13a5 5 0 00-5 5v1a2 2 0 002 2h12a2 2 0 002-2v-1a5 5 0 00-5-5z"
                        data-name="Path 1315"
                        transform="translate(-2 -1)"
                      ></Path>
                      <Circle
                        cx="4"
                        cy="4"
                        r="4"
                        fill="#8a8c90"
                        data-name="Ellipse 172"
                        transform="translate(4.284 2)"
                      ></Circle>
                    </G>
                  </G>
                </Svg>
              );
            }
          }
        },

        tabBarHideOnKeyboard: true, // Warning corrected due to previous code deprecated
        tabBarActiveTintColor: "#011936", // Use a real color code, not only #
        tabBarInactiveTintColor: "#AEB1B5",
        tabBarStyle: [
          {
            backgroundColor: "#ffffff",
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
          }
        }}

      />
      <Tab.Screen name="Myevent" component={MyEvent} />
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator >
  );
}

export default function App() {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator >

          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
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
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="EditEvent" component={EditEventScreen} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}


