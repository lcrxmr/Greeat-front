import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Image, Button, FAB } from 'react-native-elements'
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const handleDelete = (value) => {

    console.log(value)

    fetch('http://172.16.190.132:3000/delete-recipe?recipeID=' + value, { method: 'DELETE' })

}



function Recipe(props) {


    const [myRecipeList, setMyRecipeList] = useState([]);
    //const [recipeCount, setRecipeCount] = useState(0);


    useEffect(() => {

        fetch("http://172.16.190.132:3000/recipes")
            .then(response => response.json())
            .then(data => setMyRecipeList(data))


        console.log('recipeCount' + props.recipeCount)

    }, [props.recipeCount])


    let recipeList = myRecipeList.map((recipe, i) => {

        return (
            <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}
            >
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/favicon.png')}
                    onPress={() => {

                        props.navigation.navigate("RecipeDetails", { screen: "RecipeDetailsScreen", recipe: recipe })


                    }} />
                <Text style={{ width: '30%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>{recipe.name}</Text>

                <Button title="Edit"

                    onPress={() => {
                        props.navigation.navigate("EditRecipe", { screen: "EditRecipeScreen", recipe: recipe })
                    }}
                    titleStyle={{ fontSize: 5 }} containerStyle={{
                        justifyContent: 'center', //Centered horizontally
                        alignItems: 'center', //Centered vertically
                        flex: 1,
                        width: 40,
                        height: 30

                    }} />
                <Button title="Supprimer"


                    onPress={() => {
                        handleDelete(recipe._id);
                        props.deleteOneRecipe();

                    }

                    }
                    titleStyle={{ fontSize: 5 }} containerStyle={{
                        justifyContent: 'center', //Centered horizontally
                        alignItems: 'center', //Centered vertically
                        flex: 1,
                        width: 40,
                        height: 30

                    }} />
            </View>

        )
    })



    return (
        <ScrollView style={{ flex: 1 }}>
            {recipeList}

            <FAB title="Create" color='blue' onPress={() => {

                props.navigation.navigate("CreateRecipe", { screen: "CreateRecipeScreen" })


            }}
            />

        </ScrollView>

    );
}

function mapStateToProps(state) {
    return { recipeCount: state.recipeCount }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteOneRecipe: function () {
            dispatch({ type: 'delete' })
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);