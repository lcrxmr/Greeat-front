import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Button, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import SelectDropdown from 'react-native-select-dropdown'


export default function RecipeDetails({ route }) {


    var recipe = route.params.recipe

    console.log('testID' + recipe)
    //const [recipe, setRecipe] = useState()


    /* useEffect(() => {



        fetch('http://172.17.188.13:3000/recipe?recipeID=' + recipeID, {
            method: 'GET'
        }).then(response => response.json()).then(data => setRecipe(data))


    }, []) */




    console.log(recipe)

    let ingredientList = recipe.ingredients.map((item, i) => {

        var qty = item.qty + ' ' + item.unit;

        return (
            <View style={{ flexDirection: 'row', borderWidth: 1, height: 'auto' }}>

                <Text style={{ flex: 2, borderWidth: 1, }}>{item.name}</Text>
                <Text style={{ flex: 2, borderWidth: 1, }}>{qty}</Text>

            </View >

        )
    })





    return (

        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', margin: 50 }} >

                <Image
                    style={{ width: 50, height: 50, }}
                    source={require('../assets/favicon.png')}
                />

            </View>


            {ingredientList}


            <View >

                <Text> Preparation </Text>

                <Text> {recipe.description} </Text>
            </View>

        </View>


    )

}