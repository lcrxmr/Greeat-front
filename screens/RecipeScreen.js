import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllRecipes from './AllRecipesScreen'
import MyRecipes from './MyRecipesScreen'



const Tab = createMaterialTopTabNavigator();




export default function Recipe() {
  return (


    <Tab.Navigator>
      <Tab.Screen name="All" component={AllRecipes} />
      <Tab.Screen name="My Recipes" component={MyRecipes} />
    </Tab.Navigator>



  );
}
