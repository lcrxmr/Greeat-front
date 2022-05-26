import React, { useState } from "react";
import { ScrollView, TextInput,  } from "react-native";
import { connect } from "react-redux";


function ForgetPassword () {
  
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        marginVertical: 100,
      }}
    >
      {/* <Logo /> */}

      <Text>Renitialiser mot de passe</Text>

      <TextInput
        name="EMAIL"
        value={email}
        // setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />
      

      <Button
        title="Renitialiser mot de passe"
        onPress={() => {
          
          
        }}
      />


      <Text>
        Not yet registred ?{" "}
        <Text
          onPress={() => props.navigation.navigate("SignUp")}
          color="#ff2222"
        >
          Sign Up
        </Text>
      </Text>
      <Text style={{ marginTop: 10 }}>Forgot password? </Text>
    </ScrollView>
  );
};

