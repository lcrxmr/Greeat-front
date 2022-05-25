import React, { useState } from "react";
import { View,TextInput,  Text } from "react-native";
import { connect } from "react-redux";
import { Button  } from "react-native-elements";

// import SubmitButton from "../components/SubmitButton";

// import Logo from "../components/Logo";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);

  const [listErrorsSignup, setErrorsSignup] = useState([]);

  var handleSubmitSignUp = async () => {
    const data = await fetch("http://192.168.1.28:3000/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${name}&email=${email}&password=${password}`,
    });
    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.token);
      props.navigation.navigate("BottomNavigator" , {screen: 'Map'});
    } else {
      
      setErrorsSignup(body.error);
    }
  };

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <Text>{error}</Text>;
  });

  return (
    <View
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        marginVertical: 100,
      }}
    >
      {/* <Logo /> */}

      <Text>Sign Up</Text>

      <TextInput
        name="NAME"
        style={{}}
        value={name}
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={(val) => setName(val)}
      />
      <TextInput
        name="EMAIL"
        value={email}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        name="PASSWORD"
        value={password}
        secureTextEntry={true}
        autoComplteType="password"
        onChangeText={(val) => setPassword(val)}
      />

      <Button
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
