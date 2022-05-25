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
      <View style={{ justifyContent: "center", alignItems: "center", marginTop:30 }}>
      <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={109.179}
    height={109.179}
    viewBox="0 0 109.179 109.179"
    onPress={() => {
      props.navigation.navigate("ProfileFromMenu", { screen: "Profile" });
    }}
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
      id="Group_47020"
      data-name="Group 47020"
      transform="translate(-125.58 -114.026)"
    >
      <Circle
        id="Ellipse_207"
        data-name="Ellipse 207"
        cx={54.59}
        cy={54.59}
        r={54.59}
        transform="translate(125.58 114.026)"
        fill="#f4f6f8"
      />
      <G
        id="Group_892"
        data-name="Group 892"
        transform="translate(158.443 144.53)"
      >
        <G id="group" transform="translate(0 0)">
          <Path
            id="Path_1315"
            data-name="Path 1315"
            d="M15.31,13A13.31,13.31,0,0,0,2,26.31v2.662A5.324,5.324,0,0,0,7.324,34.3H39.269a5.324,5.324,0,0,0,5.324-5.324V26.31A13.31,13.31,0,0,0,31.283,13Z"
            transform="translate(-2 13.765)"
            fill="url(#linear-gradient)"
          />
          <Circle
            id="Ellipse_172"
            data-name="Ellipse 172"
            cx={10.752}
            cy={10.752}
            r={10.752}
            transform="translate(11.84 0)"
            fill="url(#linear-gradient)"
          />
        </G>
      </G>
    </G>
  </Svg>
        <Text style={{ marginTop: 10, fontSize: 20 }}>John Doe</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={30.203}
            height={25.641}
            viewBox="-5 -5 30.203 25.641"
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
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(6.101 1.822)"
            >
              <G id="eye" transform="translate(-0.118 -0.118)">
                <Rect
                  id="Rectangle_4425"
                  data-name="Rectangle 4425"
                  width={18}
                  height={18}
                  transform="translate(0.118 0.118)"
                  opacity={0}
                />
                <Circle
                  id="Ellipse_212"
                  data-name="Ellipse 212"
                  cx={1.14}
                  cy={1.14}
                  r={1.14}
                  transform="translate(7.978 7.978)"
                  fill="#c5cbd3"
                />
                <G
                  transform="matrix(1, 0, 0, 1, -5.98, -1.7)"
                  filter="url(#Path_2688)"
                >
                  <Path
                    id="Path_2688-2"
                    data-name="Path 2688"
                    d="M17.1,9.938c-.486-.843-3.161-5.076-7.7-4.939C5.19,5.105,2.759,8.8,2.1,9.938a.76.76,0,0,0,0,.76c.479.828,3.039,4.939,7.515,4.939H9.8c4.2-.106,6.641-3.8,7.294-4.939A.76.76,0,0,0,17.1,9.938ZM9.6,12.977a2.659,2.659,0,1,1,2.659-2.659A2.659,2.659,0,0,1,9.6,12.977Z"
                    transform="translate(5.5 0.5)"
                    fill="url(#linear-gradient)"
                  />
                </G>
              </G>
            </G>
          </Svg>
          <Text style={{ paddingLeft: 5, marginTop: 5, fontSize: 12 }}>
            see my public profile
          </Text>
        </View>
        <View style={{marginTop: 20 }}>
        <Text style={{fontWeight:'100'}}>
          ________________________________</Text>
        </View>
        <View style={{marginTop: 40 }}>
          <Text
          style={{ fontSize: 20 }}
        > Notifications </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Wishlist </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Chat </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Settings </Text>
          </View>
          <View style={{marginTop: 40 }}>
        <Text style={{fontWeight:'100'}}>
          ________________________________</Text>
        </View>
        <Button
          buttonStyle={{
            marginTop: 80,
            margin: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: "#476A70",
            borderRadius: 25,
          }}
          titleStyle={{ color: "white" }}
          title="Logout"
          onPress={() => {
            props.navigation.navigate("SignIn", { screen: "SignIn" });
          }}
        ></Button>
      </View>
  </ScrollView>

    );
    }