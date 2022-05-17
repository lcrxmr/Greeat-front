import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Image, Button } from 'react-native-elements'





const Tab = createMaterialTopTabNavigator();




export default function Recipe() {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/favicon.png')} />
                <Text style={{ width: '50%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>Description</Text>

                <Button title="Edit" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: 'center', //Centered horizontally
                    alignItems: 'center', //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20

                }} />
            </View>

            <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/favicon.png')} />
                <Text style={{ width: '50%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>Description</Text>

                <Button title="Edit" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: 'center', //Centered horizontally
                    alignItems: 'center', //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20

                }} />
            </View>

            <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/favicon.png')} />
                <Text style={{ width: '50%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>Description</Text>

                <Button title="Edit" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: 'center', //Centered horizontally
                    alignItems: 'center', //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20

                }} />
            </View>

        </View>
    );
}