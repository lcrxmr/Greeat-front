import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Button, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import SelectDropdown from 'react-native-select-dropdown'


export default function RecipeDetails({ route }) {


    var event = route.params.event

    console.log('testID' + event)
    //const [recipe, setRecipe] = useState()


    /* useEffect(() => {



        fetch('http://172.17.188.13:3000/recipe?recipeID=' + recipeID, {
            method: 'GET'
        }).then(response => response.json()).then(data => setRecipe(data))


    }, []) */




    console.log(event)




    return (

        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', margin: 50 }} >

                <Image
                    style={{ width: 50, height: 50, }}
                    source={require('../assets/favicon.png')}
                />

            </View>

            <View >

                <Text> {event.name} </Text>
            </View>

            <View >

                <Text> {event.location} </Text>
            </View>

            <View >

                <Text> Description </Text>

                <Text> {event.description} </Text>
            </View>

        </View>


    )

}