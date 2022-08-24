import './firebase.js'
import RootNavigation from './navigation';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// const pour component header

// const screens = {
//   Profile: {
//     name: "Profile",
//     component: {Profile},
//     options:{ 
//       headerShown: true , 
//       // headerTitle: props => <LogoTitle {...props} />, 
//       headerBackTitleVisible: false,
//       headerTitle: () => <Header />
//     },
//     navigationOptions : ({navigation}) => {
//       return {
//       headerTitle: () => <Header />
//       }
//     },
//   }
//   }


// Main navigation component
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RootNavigation"
          component={RootNavigation}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
