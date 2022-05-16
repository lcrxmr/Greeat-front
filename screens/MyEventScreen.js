import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Image} from 'react-native'
import {createStore, combineReducers} from 'redux';




export default function MyEvent() {
    return (

     <View>
       <Text>Recipe Page</Text>
     </View>

    );
    }