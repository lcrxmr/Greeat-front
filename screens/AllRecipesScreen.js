import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native'
import { createStore, combineReducers } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen'
import MyEventScreen from './EventScreen'



const Tab = createMaterialTopTabNavigator();




export default function Recipe() {
    return (


        <View>
            <Text>
                All
            </Text>
        </View>



    );
}