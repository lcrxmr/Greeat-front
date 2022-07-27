import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LogoSignin } from "./../components/logo-signin";

const auth = getAuth();

const SignInScreen = ({ navigation }) => {

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }
  var width = Dimensions.get("window").width; //full width

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: width, marginLeft: 0, marginTop: -180 }}
        source={require("../assets/MaskGroup.png")}
      />

      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}
      >
        <LogoSignin />
      </View>

      <View
        style={{
          marginBottom: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 40 }}>Greeatings!</Text>
        <Text style={{ fontWeight: "200", fontSize: 14 }}>
          Login and engage with our community!
        </Text>
      </View>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <TextInput
        style={styles.mailInput}
        name="EMAIL"
        placeholder="email"
        placeholderTextColor={"#476A70"}
        value={value.email}
        // setValue={setEmail}
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
        name="PASSWORD"
        placeholder="password"
        placeholderTextColor={"#476A70"}
        value={value.password}
        style={styles.passwordInput}
        // setValue={setPassword}
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
      <Text
        style={{
          marginTop: 5,
          marginLeft: 190,
          fontWeight: "100",
          fontSize: 12,
        }}
        onPress={() => props.navigation.navigate("ForgetPassword")}
      >
        Forgot password?{" "}
      </Text>

      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: "white" }}
        title="Sign In"
        onPress={() => {
          signIn
        }}
      />
      {/*         <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
 */}
      <View
        style={{
          marginBottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Don't have an account ? </Text>
        <Text
          style={{ fontWeight: "400", fontSize: 20 }}
          onPress={() =>
            navigation.navigate("Sign Up")
          }
          color="#ff2222"
        >
          Sign Up
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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


export default SignInScreen;