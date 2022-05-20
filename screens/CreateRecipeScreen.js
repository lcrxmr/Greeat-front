import React, { useState } from "react"
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { useEffect } from "react/cjs/react.production.min";


const handleCreate = (name, ingredient, desc) => {


  const body = {
    name: name,
    ingredients: ingredient,
    description: desc,

  };
  const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

  fetch('http://192.168.1.173:3000/create-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody
  });



}





export default function CreateRecipe(props) {

  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState('')
  const [ingredientList, setIngredientList] = useState([])
  const [desc, setDesc] = useState("");


  return (
    <View>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder={"Recipe Name"}

      />
      <View style={{ flexDirection: 'row' }}>

        <View style={{ flex: 5, marginLeft: 6, padding: 5, justifyContent: 'center' }}>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            onChangeText={setIngredient}
            value={ingredient}

            placeholder={"Ingredients"}

          >

          </TextInput>

        </View>

        <View style={{ flex: 1, margin: 2, justifyContent: 'center', marginRight: 10 }}>
          <Button title='+' titleStyle={{ fontSize: 10 }}
            onPress={() => {

              setIngredientList([...ingredientList, ingredient])

            }} > </Button>

        </View>

      </View>


      <Text>Level difficulty</Text>

      <Text>{ingredientList}</Text>



      <TextInput
        style={styles.inputDesc}
        onChangeText={setDesc}
        value={desc}
        placeholder={"Description"}
      ></TextInput>

      {/* Cree un objet evenement sur le base de donner */}
      <Button title="Create Recipe" titleStyle={{ fontSize: 8 }} containerStyle={{
        justifyContent: "center", //Centered horizontally
        alignItems: "center", //Centered vertically
        flex: 1,
        width: 30,
        height: 20
      }} onPress={() => {

        handleCreate(name, ingredient, desc);
        props.navigation.navigate("Recipe", { screen: "RecipeScreen" })

      }} />

      {/*  aucune action : office de retour sur page my event
                         essayer de trouver un fonctionnaliter  */}
      <Button title="Cancel" titleStyle={{ fontSize: 8, color: 'white' }} containerStyle={{
        justifyContent: "center", //Centered horizontally
        alignItems: "center", //Centered vertically
        flex: 1,
        width: 30,
        height: 20
      }} onPress={() => {
      }} />

    </View >

  )

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDesc: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});