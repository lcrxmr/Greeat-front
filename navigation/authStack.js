import SignInScreen from '../screens/SignIn';
import SignOutScreen from '../screens/SignUp';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';



const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Sign In" component={SignInScreen} options={{ headerShown: false }}
            />
            <Stack.Screen name="Sign Up" component={SignOutScreen} options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}