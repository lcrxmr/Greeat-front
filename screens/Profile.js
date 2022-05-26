
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileView from './ProfileView'
import MyEventsScreen from './MyEventsScreen'
import MyRecipesScreen from './MyRecipesScreen'

const Tab = createMaterialTopTabNavigator();


export default function ProfileContent() {


    return (

    <Tab.Navigator style={{flex:1, justifyContent:'center'}}>

        <Tab.Screen name="Profile" component={ProfileView} />
        <Tab.Screen name="Events" component={MyEventsScreen} />
        <Tab.Screen name="My Recipes" component={MyRecipesScreen} />

    </Tab.Navigator>

      
        

    );
    }