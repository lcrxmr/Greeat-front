import { Eye } from "./../components/eye";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileImg } from "./../components/profile-img";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function Menu(props) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainView}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ProfileFromMenu", {
              screen: "Profile",
            });
          }}
        >
          <ProfileImg />
        </TouchableOpacity>

        <Text style={styles.name}>John Doe</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ProfileFromMenu", {
              screen: "Profile",
            });
          }}
        >
          <View style={styles.eyeIconView}>
            <Eye />
            <Text style={styles.seeProfileText}>see my public profile</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.lineView}>
          <Text style={styles.line}>________________________________</Text>
        </View>
        <View style={styles.menuMargins}>
          <Text style={styles.menuButtons}> Notifications </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.menuButtons}> Wishlist </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.menuButtons}> Chat </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.menuButtons}> Settings </Text>
        </View>
        <View style={styles.menuMargins}>
          <Text style={styles.line}>________________________________</Text>
        </View>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTextStyle}
          title="Logout"
          onPress={() => {
            props.navigation.navigate("SignIn", { screen: "SignIn" });
          }}
        ></Button>
      </View>
    </ScrollView>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  name: { marginTop: 10, fontSize: 20 },
  eyeIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  seeProfileText: { paddingLeft: 5, marginTop: 5, fontSize: 12 },
  lineView: { marginTop: 20 },
  line: { fontWeight: "100" },
  menuMargins: { marginTop: 40 },
  menuButtons: { fontSize: 20 },
  buttonStyle: {
    marginTop: 80,
    margin: 10,
    width: 170,
    shadowRadius: 10,
    backgroundColor: "#476A70",
    borderRadius: 25,
  },
  buttonTextStyle: { color: "white" },
});
