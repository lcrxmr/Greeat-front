import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { setDoc, doc, collection, getFirestore } from "firebase/firestore";


import React, { useState } from "react";
import { View, TextInput, Text, Dimensions, Image, StyleSheet } from "react-native";
import { LogoSignin } from "./../components/logo-signin";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';




const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const auth = getAuth();

  //initialisation de la BDD
  const db = getFirestore();


  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
      const user = userCredential.user;
      console.log(userCredential)

      const docRef = await setDoc(doc(db, "user", user.uid), {
        email: user.email,
      });
      console.log('docRef' + docRef)

    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  var width = Dimensions.get("window").width; //full width


  return (
    <View
      style={styles.mainView}
    >
      <Image
        style={{ width: width, marginLeft: 0, marginTop: -270 }}
        source={require("../assets/MaskGroup.png")}
      />

      <LogoSignin />
      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}


      <View
        style={{
          marginBottom: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 40 }}>Welcome!</Text>
        <Text style={{ fontWeight: "200", fontSize: 14 }}>
          Create an account to join our community!
        </Text>
      </View>

      <TextInput
        style={styles.mailInput}
        placeholderTextColor={"#476A70"}
        name="EMAIL"
        value={value.email}
        placeholder="email"
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setValue({ ...value, email: text })}
      />
      {/* <Input
        placeholder='Email'
        containerStyle={styles.control}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        leftIcon={<Icon
          name='envelope'
          size={16}
        />}
      /> */}

      <TextInput
        placeholderTextColor={"#476A70"}
        style={styles.passwordInput}
        name="PASSWORD"
        value={value.password}
        placeholder="password"
        secureTextEntry={true}
        autoComplteType="password"
        onChangeText={(text) => setValue({ ...value, password: text })}
      />
      {/* <Input
        placeholder='Password'
        containerStyle={styles.control}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16}
        />}
      /> */}
      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: "white" }}
        title="Sign Up"
        onPress={signUp}
      />


      <Text>Already Joined? </Text>
      <Text
        style={{ fontWeight: "400", fontSize: 20 }}

        onPress={() => navigation.navigate("Sign In")}
        color="#ff2222"
      >
        Sign In
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 100,
    alignItems: "center",
    marginTop: 150,
  },
  nameInput: {
    marginTop: 10,
    borderWidth: 0,
    height: 40,
    borderRadius: 20,
    width: 300,
    padding: 10,
    opacity: 0.22,
    fontColor: "#8A8C90",
    backgroundColor: "#C5CBD3",
  },
  mailInput: {
    marginTop: 10,
    borderWidth: 0,
    height: 40,
    borderRadius: 20,
    width: 300,
    padding: 10,
    opacity: 0.22,
    color: "#8A8C90",
    backgroundColor: "#C5CBD3",
  },
  passwordInput: {
    marginTop: 10,
    borderWidth: 0,
    height: 40,
    borderRadius: 20,
    width: 300,
    padding: 10,
    opacity: 0.22,
    color: "#8A8C90",
    backgroundColor: "#C5CBD3",
  },
  button: {
    marginTop: 60,
    margin: 10,
    width: 170,
    shadowRadius: 10,
    backgroundColor: "#476A70",
    borderRadius: 25,
  },
});

export default SignUpScreen;