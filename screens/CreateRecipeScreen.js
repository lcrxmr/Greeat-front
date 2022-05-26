import React, { useState } from "react"
import { View, ScrollView, TextInput, StyleSheet, Button, Text, TouchableHighlight } from 'react-native';
import { useEffect } from "react/cjs/react.production.min";
import { connect } from 'react-redux';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import SelectDropdown from 'react-native-select-dropdown'



const handleCreate = (name, ingredientList, desc) => {

  console.log(ingredientList)

  const body = {
    name: name,
    ingredients: ingredientList,
    description: desc,

  };


  const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');


  fetch('http://172.16.190.131:3000/create-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });


}



function CreateRecipe(props) {

  const [name, setName] = useState("");
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQty, setIngredientQty] = useState(0)
  const [ingredientUnit, setIngredientUnit] = useState('mg')

  const [ingredientList, setIngredientList] = useState([])
  const [desc, setDesc] = useState("");

  const [ingredientCount, setIngredientCount] = useState(0);

  const handleChange = (text) => {

    console.log(text.text)

  }
  const addIngredient = () => {

    setIngredientCount(ingredientCount + 1)

    console.log(ingredientCount)

    var ingredient = <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>

      <View key={ingredientCount} style={{ flex: 3 }}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={ingredientName}
          placeholder={"Ingredients"}
        >
        </TextInput>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={[styles.input, { fontSize: 12 }]}
          onChangeText={setIngredientQty}
          value={ingredientQty}
          keyboardType='numeric'
          placeholder={"Quantity"}
        >
        </TextInput>
      </View>

      <View style={{ flex: 1 }}>
        <SelectDropdown
          data={['mg', 'g', 'mL', 'L']}
          defaultValue='mg'
          buttonStyle={{
            width: '100%', marginTop: 10,
            height: 40,
            borderRadius: 20,
            padding: 5,
            backgroundColor: '#00000012',
            borderColor: 'white',
          }}
          buttonTextStyle={{ fontSize: 14, color: '#8A8C90', }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setIngredientUnit(selectedItem)
          }} />

      </View>

    </View>

    return ingredient


  }



  var ingredientListView = ingredientList.map((ingredient, i) => {


    return (

      <View key={i} style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ borderWidth: 1, width: '50%', margin: 5 }}> {ingredient.name} / {ingredient.qty} / {ingredient.unit} </Text>
      </View>
    )
  })

  let [fontsLoaded] = useFonts({
    Poppins_400Regular
  });


  return (

    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>

        <Text style={styles.fieldName}>  Images </Text>

        <View style={{ alignItems: 'center', margin: 10, padding: 30, borderStyle: 'dashed', borderWidth: 1, borderColor: '#C5CBD3', borderRadius: 20 }}>



          <TouchableHighlight
            onPress={() => {
              setIngredientList([...ingredientList, { name: ingredientName, qty: ingredientQty, unit: ingredientUnit }])

            }} >
            <Text style={{ fontSize: 30 }}> + </Text>
          </TouchableHighlight>

        </View>

        <Text style={styles.fieldName}>  Recipe Name </Text>


        <TextInput
          style={[styles.input, { marginHorizontal: 10 }]}
          onChangeText={setName}
          value={name}
          placeholder={"Recipe Name"}
        />

        <Text style={styles.fieldName}>  Ingredients </Text>

        {ingredientList}

        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.input}
              onChangeText={setIngredientName}
              value={ingredientName}
              placeholder={"Ingredients"}
            >
            </TextInput>
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              style={[styles.input, { fontSize: 12 }]}
              onChangeText={setIngredientQty}
              value={ingredientQty}
              keyboardType='numeric'
              placeholder={"Quantity"}
            >
            </TextInput>
          </View>

          <View style={{ flex: 1 }}>
            <SelectDropdown
              data={['mg', 'g', 'mL', 'L']}
              defaultValue='mg'
              buttonStyle={{
                width: '100%', marginTop: 10,
                height: 40,
                borderRadius: 20,
                padding: 5,
                backgroundColor: '#00000012',
                borderColor: 'white',
              }}
              buttonTextStyle={{ fontSize: 14, color: '#8A8C90', }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setIngredientUnit(selectedItem)
              }} />

          </View>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#C5CBD3', borderRadius: 20 }}>


          <Text style={{ flex: 4, margin: 5 }}> Add an ingredient </Text>
          <TouchableHighlight
            onPress={() => {

              setIngredientList([...ingredientList, addIngredient()])

            }} >
            <Text style={{ fontSize: 30 }}> + </Text>
          </TouchableHighlight>

        </View>



        <Text style={styles.fieldName}>  Description </Text>


        <View>

          <Text style={styles.inputText}>  Step 1 </Text>

          <TextInput
            style={[styles.input, { marginHorizontal: 10 }]}
            onChangeText={setDesc}
            value={desc}
            placeholder={"Description"}
          ></TextInput>

          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#C5CBD3', borderRadius: 20 }}>


            <Text style={{ flex: 4, margin: 5 }}> Add a step
            </Text>
            <TouchableHighlight
              onPress={() => {
                setIngredientList([...ingredientList, { name: ingredientName, qty: ingredientQty, unit: ingredientUnit }])

              }} >
              <Text style={{ fontSize: 30 }}> + </Text>
            </TouchableHighlight>

          </View>

        </View>

      </ScrollView >

      <View style={{
        flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', padding: 20
      }}>
        <TouchableHighlight

          onPress={() => {

          }} >
          <Text style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 15,
            color: '#011936',
            marginLeft: 10,
            borderRadius: 20,
            padding: 10
          }}> Cancel </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {

            handleCreate(name, ingredientList, desc);
            props.addOneRecipe();

            props.navigation.navigate("Recipe", { screen: "RecipeScreen" })
          }} >
          <Text style={{
            alignItems: 'center',
            backgroundColor: '#476A70',
            fontFamily: 'Poppins_400Regular',
            fontSize: 15,
            color: 'white',
            marginLeft: 10,
            borderRadius: 20,
            padding: 10
          }}> Create Recipe </Text>
        </TouchableHighlight>

      </View>
    </View>

  )

}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,

    padding: 10,
    backgroundColor: '#00000012',
    borderColor: 'white',
  },
  screen: {
    backgroundColor: 'white'
  },
  fieldName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#AEB1B5',
    marginLeft: 10,
    marginTop: 10
  },
  inputText: {

    fontSize: 12,
    color: '#8A8C90',
    marginLeft: 20,
    marginTop: 10

  },


});

function mapDispatchToProps(dispatch) {
  return {
    addOneRecipe: function () {
      dispatch({ type: 'add' })
    }
  }
}
export default connect(null, mapDispatchToProps)(CreateRecipe);