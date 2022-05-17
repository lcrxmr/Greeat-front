import React from "react"
import { View, TextInput, StyleSheet, Button,} from 'react-native';

export default function Created(props) {
    const [name, setName] = useState(""); 
    const [email,setEmail] = useState("")

    return ( 
<View>
        <Button title = "save" titleStyle={{ fontSize: 8 }} containerStyle={{
            justifyContent: "center", //Centered horizontally
            alignItems: "center", //Centered vertically
            flex: 1,
            width: 30,
            height: 20
        }}  onPress={() => {
          props.navigation.navigate("MyEventScreen", { screen: "MyEventScreen" })
        }} />

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={text}
        placeHolder={"User Name"}
      />

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={text}
        placeHolder={"Email"}
      />

</View>

    ) 
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });