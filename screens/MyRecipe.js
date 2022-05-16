import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Card} from 'react-native';
import {Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Image} from 'react-native'
import {createStore, combineReducers} from 'redux';




export default function MyRecipe(props) {
    return (

      <ScrollView style={{ flex: 1 }}>
      <View>
        <Text> My Recipe </Text>
      </View>
  </ScrollView>

    );
    }