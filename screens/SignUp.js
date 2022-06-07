import React, { useState } from "react";
import { View, TextInput, Text, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { LogoSignin } from "./../components/logo-signin";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);

  const [listErrorsSignup, setErrorsSignup] = useState([]);

  var handleSubmitSignUp = async () => {
    const data = await fetch(
      "https://damp-mountain-22575.herokuapp.com/sign-up",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${name}&email=${email}&password=${password}`,
      }
    );
    const body = await data.json();
    console.log("***********BODY", body);

    if (body.result == true) {
      props.addToken(body.token);
      props.navigation.navigate("BottomNavigator", { screen: "Map" });
      console.log("***********BODY", body.token);
      await AsyncStorage.setItem("token", props.token);
    } else {
      setErrorsSignup(body.error);
    }

  };

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <Text>{error}</Text>;
  });

  var width = Dimensions.get("window").width; //full width

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginVertical: 100,
        alignItems: "center",
        marginTop: 150,
      }}
    >
      <Image
        style={{ width: width, marginLeft: 0, marginTop: -270 }}
        source={require("../assets/MaskGroup.png")}
      />

      <LogoSignin />

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
        style={{
          marginTop: 10,
          borderWidth: 0,
          height: 40,
          borderRadius: 20,
          width: 300,
          padding: 10,
          opacity: 0.22,
          fontColor: "#8A8C90",
          backgroundColor: "#C5CBD3",
        }}
        placeholderTextColor={"#476A70"}
        name="NAME"
        value={name}
        placeholder="name"
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={(val) => setName(val)}
      />
      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 0,
          height: 40,
          borderRadius: 20,
          width: 300,
          padding: 10,
          opacity: 0.22,
          fontColor: "#8A8C90",
          backgroundColor: "#C5CBD3",
        }}
        placeholderTextColor={"#476A70"}
        name="EMAIL"
        value={email}
        placeholder="email"
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        placeholderTextColor={"#476A70"}
        style={{
          marginTop: 10,
          borderWidth: 0,
          height: 40,
          borderRadius: 20,
          width: 300,
          padding: 10,
          opacity: 0.22,
          fontColor: "#8A8C90",
          backgroundColor: "#C5CBD3",
        }}
        name="PASSWORD"
        value={password}
        placeholder="password"
        secureTextEntry={true}
        autoComplteType="password"
        onChangeText={(val) => setPassword(val)}
      />

      <Button
        buttonStyle={{
          marginTop: 60,
          margin: 10,
          width: 170,
          shadowRadius: 10,
          backgroundColor: "#476A70",
          borderRadius: 25,
        }}
        titleStyle={{ color: "white" }}
        title="Sign Up"
        onPress={() => {
          handleSubmitSignUp();
        }}
      />

      {tabErrorsSignup}

      <Text>
        <Text>Already Joined? </Text>
        <Text
          onPress={() => props.navigation.navigate("SignIn")}
          color="#ff2222"
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}
export default connect(null, mapDispatchToProps)(SignUp);
