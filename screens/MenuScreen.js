import { Eye } from './../components/eye';
import { Text, View, ScrollView} from 'react-native';
import { Button } from "react-native-elements";
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileImg } from './../components/profile-img';

const Stack = createStackNavigator();

export default function Menu(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop:30 }}>
      <ProfileImg     />
        <Text style={{ marginTop: 10, fontSize: 20 }}>John Doe</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Eye     />
          <Text style={{ paddingLeft: 5, marginTop: 5, fontSize: 12 }}>
            see my public profile
          </Text>
        </View>
        <View style={{marginTop: 20 }}>
        <Text style={{fontWeight:'100'}}>
          ________________________________</Text>
        </View>
        <View style={{marginTop: 40 }}>
          <Text
          style={{ fontSize: 20 }}
        > Notifications </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Wishlist </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Chat </Text>
          </View>
          <View style={{marginTop: 20 }}>
          <Text
          style={{ fontSize: 20 }}
        > Settings </Text>
          </View>
          <View style={{marginTop: 40 }}>
        <Text style={{fontWeight:'100'}}>
          ________________________________</Text>
        </View>
        <Button
          buttonStyle={{
            marginTop: 80,
            margin: 10,
            width: 170,
            shadowRadius: 10,
            backgroundColor: "#476A70",
            borderRadius: 25,
          }}
          titleStyle={{ color: "white" }}
          title="Logout"
          onPress={() => {
            props.navigation.navigate("SignIn", { screen: "SignIn" });
          }}
        ></Button>
      </View>
  </ScrollView>

    );
    }