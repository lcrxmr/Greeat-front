
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileView from './ProfileView'
import MyEventsScreen from './MyEventsScreen'
import MyRecipesScreen from './MyRecipesScreen'

const Tab = createMaterialTopTabNavigator();

// class LogoTitle extends React.Component {
//     render() {
//       return (
//         <Image
//           source={require('../assets/favicon.png')}
//           style={{ width: 30, height: 30 }}
//         />
//       );
//     }
//   }

export default function ProfileContent() {


    return (

    <Tab.Navigator style={{flex:1, justifyContent:'center'}} defaultNavigationOptions= {{
        headerBackTitleVisible: false,
      }} >

        <Tab.Screen name="Profile" component={ProfileView} />
        <Tab.Screen name="Events" component={MyEventsScreen} />
        <Tab.Screen name="My Recipes" component={MyRecipesScreen} />

    </Tab.Navigator>

      
        

    );
    }