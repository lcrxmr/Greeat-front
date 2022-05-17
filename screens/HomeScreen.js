import { Text, View, Button } from 'react-native';





export default function Home(props) {
    return (

     <View>
       <Text>home Page</Text>
       <Button
      title="Go"
      type="solid"
      buttonStyle={{ backgroundColor: "#009788" }}
      onPress={() => {  props.navigation.navigate('BottomNavigator', { screen: 'Map' }) }}
    />
     </View>

    );
    }