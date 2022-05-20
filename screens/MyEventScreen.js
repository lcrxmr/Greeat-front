import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Going from './goingScreenMyEvents'
import Created from './CreatScreenMyEvents'


const Tab = createMaterialTopTabNavigator();

export default function MyEvent() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Going" component={Going} />
            <Tab.Screen name="Created" component={Created} />
        </Tab.Navigator>
    );
}