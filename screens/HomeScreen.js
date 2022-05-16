import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Image} from 'react-native'
import {createStore, combineReducers} from 'redux';




export default function Home(props) {
    return (

     <View>
       <Text>home Page</Text>
       <Button
      title="Go"
      type="solid"
      buttonStyle={{ backgroundColor: "#009788" }}
      onPress={() => {  props.navigation.navigate('BottomNavigator', { screen: 'Map' }) }}
    />
     </View>

    );
    }