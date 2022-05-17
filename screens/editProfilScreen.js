import React, {useState,useEffect} from "react"
import { View, TextInput, StyleSheet, Button,Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfil(props) {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    return (
<View>

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    
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
        style={styles.inputDesc}
        onChangeText={setText}
        value={text}
        placeHolder={"Description"}

      />

<Button title = "Personal Information Settings" titleStyle={{ fontSize: 8 }} containerStyle={{
            justifyContent: "center", //Centered horizontally
            alignItems: "center", //Centered vertically
            flex: 1,
            width: 30,
            height: 20
        }}  onPress={() => {
          props.navigation.navigate("MyEventScreen", { screen: "MyEventScreen" }) // reset password route
        }} />

      </View>
    )
}

const styles = StyleSheet.create({
    inputDesc: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });