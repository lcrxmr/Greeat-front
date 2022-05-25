import React, { useState } from "react";
import {  ScrollView, Button, TextInput, Text } from "react-native";
import { connect } from "react-redux";

// import Logo from "../components/Logo";

function SignIn (props)  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);

  const [errorsSignin, setErrorsSignin] = useState([]);

  // console.log(email),
  // console.log(password)

  var handleSubmitSignIn = async () => {
    const data = await fetch("http://172.16.190.136:3000/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });
    
    const body = await data.json();
    // console.log (body);

    
      if (body.result == true) {
        props.addToken(body.token);
        // setUserExists(true);
        props.navigation.navigate("BottomNavigator" , {screen: 'Map'});
      } else {
        setErrorsSignin(body.error);
      }}
    

    // if (userExists) {
    //   console.log("utilisateur existe");
    //    props.navigation.navigate("MapScreen");
    // };

    var tabErrorsSignin = errorsSignin.map((error, i) => {
      return (<Text>{error}</Text>);
    });
  
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        marginVertical: 100,
      }}
    >
      

      <Text>Sign In</Text>

      <TextInput
        name="EMAIL"
        value={email}
        // setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        name="PASSWORD"
         value={password}
        // setValue={setPassword}
         secureTextEntry={true}
         autoComplteType="password"
        onChangeText={(val) => setPassword(val)}
      />

      <Button
        
        title="Sign In"
        onPress={() => {
          handleSubmitSignIn();
          
        }}
      />

      {tabErrorsSignin}

      <Text>
        Not yet registred ?{" "}
        <Text
          onPress={() => props.navigation.navigate("SignUp")}
          color="#ff2222"
        >
          Sign Up
        </Text>
      </Text>
      <Text style={{ marginTop: 10 } } onPress={() => props.navigation.navigate("ForgetPassword")}>Forgot password? </Text>
    </ScrollView>
  );
};


function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    },
  };
}
export default connect(
  null,
  mapDispatchToProps
)(SignIn);
