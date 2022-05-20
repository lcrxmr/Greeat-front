import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Image, Button, FAB } from 'react-native-elements'









const Tab = createMaterialTopTabNavigator();





const handleDelete = (value) => {

    console.log(value)

    const body = {
        recipeID: value,

    };
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');


    fetch('http://192.168.1.173:3000/delete-recipe?recipeID=' + value, { method: 'DELETE' })


}


const handleEdit = (value) => {

    console.log(value)



}



export default function Recipe(props) {


    const [myRecipeList, setMyRecipeList] = useState([]);
    const [recipeCount, setRecipeCount] = useState(0);


    useEffect(() => {

        fetch("http://192.168.1.173:3000/recipes")
            .then(response => response.json())
            .then(data => setMyRecipeList(data))

        console.log(recipeCount)

    }, [recipeCount])






    let recipeList = myRecipeList.map((recipe, i) => {

        return (
            <View style={{ border: 'solid', padding: 10, flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/favicon.png')} />
                <Text style={{ width: '30%', fontWeight: "bold", alignSelf: 'center', marginBottom: 20 }}>{recipe.name}</Text>

                <Button title="Edit"

                    onPress={() => {

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
                        setRecipeCount(recipeCount - 1)
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

                setRecipeCount(recipeCount + 1)
                props.navigation.navigate("Create", { screen: "CreateRecipeScreen" })


            }}
            />

        </ScrollView>

    );
}