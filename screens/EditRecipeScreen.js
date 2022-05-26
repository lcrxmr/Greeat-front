import React, { useState } from "react"
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { useEffect } from "react/cjs/react.production.min";
import { connect } from 'react-redux';

import SelectDropdown from 'react-native-select-dropdown'



const handleEdit = (name, ingredientList, desc, recipe) => {

    console.log(ingredientList)

    const body = {
        _id: recipe._id,
        name: name,
        ingredients: ingredientList,
        description: desc,

    };


    /* const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); */
    /* 
      console.log('stringified' + JSON.stringify(body))
      console.log('unstringified' + JSON.parse(JSON.stringify(body))) */

    /* fetch('http://172.17.188.13:3000/create-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    }); */

    fetch('http://172.17.188.13:3000/edit-recipe', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });


}

export default function CreateRecipe(props) {


    var recipe = props.route.params.recipe
    console.log(recipe)



    const [name, setName] = useState(recipe.name);
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientQty, setIngredientQty] = useState(0)
    const [ingredientUnit, setIngredientUnit] = useState('mg')

    const [ingredientList, setIngredientList] = useState(recipe.ingredients)
    const [desc, setDesc] = useState(recipe.description);

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
                        onChangeText={setIngredientName}
                        value={ingredientName}

                        placeholder={"Ingredients"}

                    >

                    </TextInput>

                </View>

                <View style={{ flex: 2, padding: 5, justifyContent: 'center' }}>
                    <TextInput
                        style={{ borderWidth: 1, padding: 5 }}
                        onChangeText={setIngredientQty}
                        value={ingredientQty}
                        keyboardType='numeric'


                        placeholder={"Qty"}

                    >

                    </TextInput>

                </View>


                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <SelectDropdown
                        data={['mg', 'g', 'mL', 'L']}
                        defaultValue='mg'
                        buttonStyle={{ height: '31%', width: '80%', borderWidth: 1 }}
                        buttonTextStyle={{ fontSize: 14, margin: 0, padding: 0 }}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setIngredientUnit(selectedItem)
                        }} />


                </View>

                <View style={{ flex: 2, margin: 2, justifyContent: 'center', marginRight: 10 }}>
                    <Button title='+' titleStyle={{ fontSize: 10 }}
                        onPress={() => {



                            setIngredientList([...ingredientList, { name: ingredientName, qty: ingredientQty, unit: ingredientUnit }])


                        }} > </Button>

                </View>

            </View>



            {ingredientListView}



            <TextInput
                style={styles.inputDesc}
                onChangeText={setDesc}
                value={desc}
                placeholder={"Description"}
            ></TextInput>

            {/* Cree un objet evenement sur le base de donner */}
            <Button title="Edit" titleStyle={{ fontSize: 8 }} containerStyle={{
                justifyContent: "center", //Centered horizontally
                alignItems: "center", //Centered vertically
                flex: 1,
                width: 30,
                height: 20
            }} onPress={() => {

                handleEdit(name, ingredientList, desc, recipe);

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

