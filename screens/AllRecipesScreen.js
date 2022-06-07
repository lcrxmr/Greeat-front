import Delete from "../components/delete";
import Edit from "../components/edit";
import Create from "../components/create";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, Image, Button, FAB } from "react-native-elements";
import { connect } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const handleDelete = (value) => {
  console.log(value);

  fetch("https://damp-mountain-22575.herokuapp.com/delete-recipe?recipeID=" + value, {
    method: "DELETE",
  });
};

function Recipe(props) {
  const [myRecipeList, setMyRecipeList] = useState([]);
  //const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    fetch("https://damp-mountain-22575.herokuapp.com/recipes")
      .then((response) => response.json())
      .then((data) => setMyRecipeList(data));

    console.log("recipeCount" + props.recipeCount);
  }, [props.recipeCount]);

  let recipeList = myRecipeList.map((recipe, i) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate("RecipeDetails", {
            screen: "RecipeDetailsScreen",
            recipe: recipe,
          });
        }}
      >
        <Card borderRadius={15} containerStyle={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Image
                style={{ borderRadius: 10, height: 120, width: 120 }}
                source={require("../assets/photo3.jpg")}
              />
            </View>
            <View
              style={{
                flex: 1.2,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    paddingTop: 10,
                    fontWeight: "bold",
                    fontSize: 16,
                    justifyContent: "flex-start",
                  }}
                >
                  {recipe.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  paddingBottom: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: -2,
                  }}
                >
                  <Image
                    style={{
                      height: 17,
                      width: 17,
                      marginRight: 3,
                      marginTop: 0,
                    }}
                    source={require("../assets/star.png")}
                  />
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 16,
                      justifyContent: "flex-start",
                      marginRight: 3,
                      marginBottom: 3,
                    }}
                  >
                    {" "}
                    {recipe.review}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 12,
                      justifyContent: "flex-start",
                    }}
                  >
                    /5
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: -2,
                  }}
                >
                  <Image
                    style={{
                      height: 17,
                      width: 17,
                      marginRight: 3,
                      marginTop: 0,
                    }}
                    source={require("../assets/preparation.png")}
                  />
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 16,
                      justifyContent: "flex-start",
                      marginRight: 3,
                      marginBottom: 3,
                    }}
                  >
                    {" "}
                    {recipe.prepTime}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 12,
                      justifyContent: "flex-start",
                    }}
                  >
                    min of preparation
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </Card>
      </TouchableOpacity>
    );
  });

  return (
    <View style={{ flex: 1,  backgroundColor: "#FDFDFD" }}>
      <ScrollView showsVerticalScrollIndicator={false}>{recipeList}</ScrollView>
      <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 0,
        }}
      >
        <Button
          containerStyle={{
            shadowColor: "grey",
            shadowOffset: { width: 5, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 15,
            borderRadius: 35,
          }}
          buttonStyle={{
            margin: 10,
            width: 52,
            height: 52,
            shadowRadius: 10,
            backgroundColor: "white",
            borderRadius: 30,
          }}
          icon={<Create props={props} />}
          onPress={() => {
            props.navigation.navigate("CreateRecipe", {
              screen: "CreateRecipeScreen",
            });
          }}
        ></Button>
      </View>
    </View>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  cardSlider: {
    flex: 1,
    bottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: Dimensions.get("window").width,
  },
  card: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.95,
    border: "none",
  },
});

function mapStateToProps(state) {
  return { recipeCount: state.recipeCount };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteOneRecipe: function () {
      dispatch({ type: "delete" });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
