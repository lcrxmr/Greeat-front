
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileView from './ProfileView'
import MyEventsPublic from './MyEventsPublic'
import MyRecipe from './MyRecipe'

const Tab = createMaterialTopTabNavigator();


export default function ProfileContent() {


    return (

    <Tab.Navigator style={{flex:1, justifyContent:'center', marginTop:50}}>

        <Tab.Screen name="Profile" component={ProfileView} />
        <Tab.Screen name="Events" component={MyEventsPublic} />
        <Tab.Screen name="Recipes" component={MyRecipe} />

    </Tab.Navigator>

      
        

    );
    }