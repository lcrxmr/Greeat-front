import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Platform, Image, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { PlusIcon } from "../components/plus-icon";

function EditProfileScreen(props) {
  const [text, setText] = useState("");
  const [image, setImage] = useState('');

let result = []
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('--------result:',typeof result.uri);
    

    if (!result.cancelled) {
      setImage(result.uri);
    }
    
  };

 

  console.log('--------image:',image)
  return (
    
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 12,
            opacity: 0.3,
            marginLeft: 10,
            marginTop: 20
          }}
        >
          {" "}
          Images{" "}
        </Text>
        
      <View style={styles.imageField}>
        <Button
          icon={<PlusIcon />}
          buttonStyle={{
            backgroundColor: null,
          }}
          onPress={pickImage}
        ></Button>
      </View>
      <View style={{alignItems:'center', justifyContent:'center'}}>
      <Image source={{ uri: image}} style={{ width: 200, height: 200 }} />
      </View>
        
      
      <View style={{alignItems: 'flex-end'}}>
      <Button
        title="save"
        titleStyle={{ fontSize: 16 }}
        buttonStyle={{
          margin: 10,
          width: 80,
          shadowRadius: 10,
          backgroundColor: "#476A70",
          borderRadius: 25,
        }}
        onPress={() => {
          props.onSubmitPic(image);
          console.log('----save button pressed')
          console.log('----image on save', image)
        }}
      />
      </View>
      
  <Text
          style={{
            fontWeight: "500",
            fontSize: 12,
            opacity: 0.3,
            marginLeft: 10,
            marginTop: 20
          }}
        >
          {" "}
          Bio{" "}
        </Text>
        <View>
        <TextInput
        style={styles.inputDesc}
        onChangeText={setText}
        value={text}
        placeHolder={"Description"}
      />
        </View>
        <View style={{alignItems: 'flex-end'}}>
      <Button
        title="save"
        titleStyle={{ fontSize: 16 }}
        buttonStyle={{
          margin: 10,
          width: 80,
          shadowRadius: 10,
          backgroundColor: "#476A70",
          borderRadius: 25,
        }}
        onPress={() => {
          props.onSubmitText(text)
          console.log('----save button pressed')
          console.log('----text on save', text)
        }}
      />
      </View>
        
      </ScrollView>
    </View>
    
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onSubmitPic: function (pic) {
      dispatch({ type: "savePic", pic: pic });
    },
    onSubmitText: function (txt){
      dispatch({type:"saveTxt", txt: txt})
    }
  };
}

export default connect(null, mapDispatchToProps)(EditProfileScreen);



const styles = StyleSheet.create({
  inputDesc: {
    marginTop: 5,
    marginLeft: 10,
    borderWidth: 0,
    height: 100,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#00000012",
    borderColor: "white",
    width: 370,
  },
  imageField: {
    alignItems: "center",
    justifyContent: 'center',
    margin: 10,
    padding: 30,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C5CBD3",
    borderRadius: 20,
    width: '95%',
  }
});
