import React from "react";
import { StyleSheet, LogBox, Image, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native'

import Edit from "../components/edit";

export default function profileHeader() {

const navigation = useNavigation()


  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
        onPress={()=> navigation.navigate('EditProfile')}
        >
          <Edit style={styles.edit}
              />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    heigth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    letterSpacing: 1,
  },
  edit: {
    width: 30,
    height: 30,
    marginBottom: 5,
    position: "absolute",
    top: 12,
    left: 120,
  },
});
