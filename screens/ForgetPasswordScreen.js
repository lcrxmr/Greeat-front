import React, { useState } from "react";
import { ScrollView, TextInput, Text } from "react-native";

export default function forgetPassword(props) {
  const [email, setEmail] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        marginVertical: 100,
      }}
    >
      <Text>Renitialiser mot de passe</Text>

      <TextInput
        name="EMAIL"
        value={email}
        // setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(val) => setEmail(val)}
      />

      <Button title="Renitialiser mot de passe" />
    </ScrollView>
  );
}