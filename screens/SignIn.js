import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { LogoSignin } from "./../components/logo-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);

  const [errorsSignin, setErrorsSignin] = useState([]);

  // console.log(email), console.log(password);


  // install reducer and connect to store
useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        props.navigation.navigate("BottomNavigator", { screen: "Map" });
      }
      console.log("Token:",token)
    }
    ).catch(
        console.log("No token")
    )
  }
  , []);

  


  var handleSubmitSignIn = async () => {
    const data = await fetch(
      "https://damp-mountain-22575.herokuapp.com/sign-in",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${email}&password=${password}`,
      }
    );

    const body = await data.json();
    console.log("**********BODY", body);
    if (body.result == true) {
      // on fait body.user.token car body a un object user
      props.addToken(body.user.token);
      // setUserExists(true);
      props.navigation.navigate("BottomNavigator", { screen: "Map" });
    } else {
      setErrorsSignin(body.error);
    }
    
    await AsyncStorage.setItem("token", props.token);
     

  };

  console.log("-----Error", errorsSignin);

  // if (userExists) {
  //   console.log("utilisateur existe");
  //    props.navigation.navigate("MapScreen");
  // };

  var tabErrorsSignin = errorsSignin.map((error, i) => {
    return <Text>{error}</Text>;
  });
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

      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 0,
          height: 40,
          borderRadius: 20,
          width: 300,
          padding: 10,
          opacity: 0.22,
          backgroundColor: "#C5CBD3",
          padding: 10,
        }}
        name="EMAIL"
        placeholder="email"
        placeholderTextColor={"#476A70"}
        value={email}
        // setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        name="PASSWORD"
        placeholder="password"
        placeholderTextColor={"#476A70"}
        value={password}
        style={{
          marginTop: 10,
          borderWidth: 0,
          height: 40,
          borderRadius: 20,
          width: 300,
          padding: 5,
          opacity: 0.22,
          fontColor: "#8A8C90",
          backgroundColor: "#C5CBD3",
          padding: 10,
        }}
        // setValue={setPassword}
        secureTextEntry={true}
        autoComplteType="password"
        onChangeText={(val) => setPassword(val)}
      />
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
      <Text style={{ color: "red", marginTop: 20 }}>{tabErrorsSignin}</Text>

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
        title="Sign In"
        onPress={() => {
          handleSubmitSignIn();
          // props.navigation.navigate('BottomNavigator')
        }}
      />
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
            props.navigation.navigate("SignUp", { screen: "SignUp" })
          }
          color="#ff2222"
        >
          Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}


function mapStateToProps(state) {
  return {
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
