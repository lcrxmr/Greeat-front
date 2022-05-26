import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from './AllEventsScreen'
import Created from './MyEventsScreen'


const Tab = createMaterialTopTabNavigator();

export default function MyEvent() {


    return (
        <Tab.Navigator>
            <Tab.Screen name="All" component={All} />
            <Tab.Screen name="Created" component={Created} />
        </Tab.Navigator>
    );
}