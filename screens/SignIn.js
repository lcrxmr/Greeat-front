import React, { useState } from "react";
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
// import Logo from "../components/Logo";
import Peinture from "../components/peinture";

import Svg, {
  G,
  Path,
  Circle,
  Rect,
  Defs,
  Stop,
  LinearGradient,
  TSpan,
} from "react-native-svg";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);

  const [errorsSignin, setErrorsSignin] = useState([]);

  console.log(email), console.log(password);

  var handleSubmitSignIn = async () => {
    const data = await fetch("http://172.16.190.132:3000/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });

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
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={300}
          height={150}
          viewBox="10 -6 131.3 80.2"
        >
          <Defs>
            <LinearGradient
              id="linear-gradient"
              y1={1}
              x2={1}
              gradientUnits="objectBoundingBox"
            >
              <Stop offset={0} stopColor="#bcea64" />
              <Stop offset={1} stopColor="#80c35f" />
            </LinearGradient>
          </Defs>
          <G id="Group_47021_1_" transform="translate(1051.5 -2383.87)">
            <G id="Group_47020" data-name="Group 47020">
              <Path
                id="Path_2710"
                data-name="Path 2710"
                d="M-982.3,2414.4a5.828,5.828,0,0,1,2.3,3.6h-3.1a3.639,3.639,0,0,0-1.4-1.6,4.141,4.141,0,0,0-2.3-.6,4.382,4.382,0,0,0-2.3.6,3.53,3.53,0,0,0-1.5,1.7,5.264,5.264,0,0,0-.5,2.6,4.89,4.89,0,0,0,1.2,3.6,4.376,4.376,0,0,0,3.4,1.3,4,4,0,0,0,2.7-.9,4.043,4.043,0,0,0,1.5-2.6h-5V2420h7.5v2.9a6.6,6.6,0,0,1-1.2,2.7,6.773,6.773,0,0,1-2.4,2,7.391,7.391,0,0,1-3.4.7,7.318,7.318,0,0,1-3.9-1,6.177,6.177,0,0,1-2.6-2.7,8.025,8.025,0,0,1-.9-3.9,8.024,8.024,0,0,1,.9-3.9,7.462,7.462,0,0,1,2.6-2.7,7.955,7.955,0,0,1,3.8-1A6.8,6.8,0,0,1-982.3,2414.4Z"
                fill="#011936"
              />
              <Path
                id="Path_2711"
                data-name="Path 2711"
                d="M-972.4,2416.8a4.752,4.752,0,0,1,2.4-.6v3.2h-.9q-3.3,0-3.3,3v5.6h-3v-11.6h3v2.2A7.691,7.691,0,0,1-972.4,2416.8Z"
                fill="#011936"
              />
              <Path
                id="Path_2712"
                data-name="Path 2712"
                d="M-957.1,2422.8h-8.5a3.2,3.2,0,0,0,.8,2.3,2.64,2.64,0,0,0,1.9.7,2.86,2.86,0,0,0,1.7-.5,2.3,2.3,0,0,0,.9-1.4h3.1a6.247,6.247,0,0,1-1,2.2,7,7,0,0,1-1.9,1.5,5.754,5.754,0,0,1-2.6.5,6.04,6.04,0,0,1-3-.7,5.3,5.3,0,0,1-2.1-2.1,6.565,6.565,0,0,1-.7-3.2,6.565,6.565,0,0,1,.7-3.2,5.3,5.3,0,0,1,2.1-2.1,6.04,6.04,0,0,1,3-.7,5.792,5.792,0,0,1,3,.7,4.821,4.821,0,0,1,2,2,5.547,5.547,0,0,1,.7,2.8A4.873,4.873,0,0,1-957.1,2422.8Zm-3.6-3.5a2.724,2.724,0,0,0-2-.7,2.724,2.724,0,0,0-2,.7,3.44,3.44,0,0,0-.9,2.2h5.6A2.571,2.571,0,0,0-960.7,2419.3Z"
                fill="#011936"
              />
              <Path
                id="Path_2713"
                data-name="Path 2713"
                d="M-943.6,2422.8h-8.5a3.2,3.2,0,0,0,.8,2.3,2.64,2.64,0,0,0,1.9.7,2.86,2.86,0,0,0,1.7-.5,2.3,2.3,0,0,0,.9-1.4h3.1a6.247,6.247,0,0,1-1,2.2,7,7,0,0,1-1.9,1.5,5.754,5.754,0,0,1-2.6.5,6.04,6.04,0,0,1-3-.7,5.3,5.3,0,0,1-2.1-2.1,6.565,6.565,0,0,1-.7-3.2,6.565,6.565,0,0,1,.7-3.2,5.3,5.3,0,0,1,2.1-2.1,6.04,6.04,0,0,1,3-.7,5.792,5.792,0,0,1,3,.7,4.821,4.821,0,0,1,2,2,5.547,5.547,0,0,1,.7,2.8C-943.5,2422-943.6,2422.4-943.6,2422.8Zm-3.7-3.5a2.724,2.724,0,0,0-2-.7,2.724,2.724,0,0,0-2,.7,3.44,3.44,0,0,0-.9,2.2h5.6A2.31,2.31,0,0,0-947.3,2419.3Z"
                fill="#011936"
              />
              <Path
                id="Path_2714"
                data-name="Path 2714"
                d="M-933.9,2416.9a4,4,0,0,1,1.5,1.9v-2.4h2.9V2428h-2.9v-2.4a4,4,0,0,1-1.5,1.9,4.093,4.093,0,0,1-2.5.7,4.406,4.406,0,0,1-2.6-.7,4.626,4.626,0,0,1-1.8-2.1,7.93,7.93,0,0,1-.7-3.2,6.565,6.565,0,0,1,.7-3.2,5.313,5.313,0,0,1,1.8-2.1,4.845,4.845,0,0,1,2.6-.7A5.2,5.2,0,0,1-933.9,2416.9Zm-3.9,2.8a3.288,3.288,0,0,0-.8,2.5,3.742,3.742,0,0,0,.8,2.5,2.94,2.94,0,0,0,2.2.9,2.941,2.941,0,0,0,2.2-.9,3.244,3.244,0,0,0,.9-2.4,3.486,3.486,0,0,0-.9-2.5,2.94,2.94,0,0,0-2.2-.9A2.544,2.544,0,0,0-937.8,2419.7Z"
                fill="#011936"
              />
              <Path
                id="Path_2715"
                data-name="Path 2715"
                d="M-920.2,2425.5v2.5h-1.6a4.48,4.48,0,0,1-3-.9,3.993,3.993,0,0,1-1-3.1v-5h-1.6v-2.5h1.6v-2.9h3v2.9h2.6v2.5h-2.6v5.1a1.737,1.737,0,0,0,.3,1.2,1.609,1.609,0,0,0,1.1.3h1.2Z"
                fill="#011936"
              />
            </G>
            <G id="Group_939_1_" transform="translate(-1009 2418.37)">
              <G
                id="Group_47021"
                data-name="Group 47021"
                transform="translate(-21 -17)"
              >
                <G
                  transform="matrix(1, 0, 0, 1, -21.5, -17.5)"
                  filter="url(#Path_69-2_1_)"
                >
                  <Path
                    id="Path_69-2_1_2"
                    data-name="Path_69-2_1_"
                    d="M14.6,0C6.5,0,0,6.8,0,15.2a17.166,17.166,0,0,0,1.7,7c2.7,6.6,11.5,15,13,15,1.6,0,10.2-8.6,12.9-14.8a18.214,18.214,0,0,0,1.8-7.2C29.2,6.8,22.7,0,14.6,0Z"
                    transform="translate(21.5 17.5)"
                    stroke="rgba(0,0,0,0)"
                    strokeMiterlimit={10}
                    strokeWidth={1}
                    fill="url(#linear-gradient)"
                  />
                </G>
              </G>
              <Path
                id="leaf_1_"
                d="M-.5-11.2C-2.8-6.9.1-3-1.3.5c-1,2.6-4.1,3.5-6,3.9a18.751,18.751,0,0,0,.1,4.1c.1.7-1.4.8-1.5.2-1.4-7.7,5-15.9,5-15.9A14.614,14.614,0,0,0-10.5,3.6a6.836,6.836,0,0,1-1-7.7C-9-9.2.1-12.2-.5-11.2Z"
                fill="#fff"
              />
            </G>
          </G>
        </Svg>
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
          padding: 10
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
          padding: 10
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
      <Text style={{color: 'red', marginTop: 20}}>
  {tabErrorsSignin}
  </Text>

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
          // handleSubmitSignIn();
          props.navigation.navigate('BottomNavigator')
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
          onPress={() => props.navigation.navigate("SignUp", { screen: "SignUp" })}
          color="#ff2222"
        >
          Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}
export default connect(null, mapDispatchToProps)(SignIn);
