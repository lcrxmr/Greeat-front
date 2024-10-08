import Create from "../components/create";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, Image, Button, FAB } from "react-native-elements";
import { connect } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const handleDelete = (value) => {
  console.log(value);

  fetch("http://localhost:3000/delete-recipe?recipeID=" + value, {
    method: "DELETE",
  });
};

function Recipe(props) {
  const [myRecipeList, setMyRecipeList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
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
              style={styles.cardRightSideView}
            >
              <View
                style={styles.recipeNameTextView}
              >
                <Text
                  style={styles.recipeNameTextStyle}
                >
                  {recipe.name}
                </Text>
              </View>
              <View
                style={styles.textView}
              >
                <View
                  style={styles.starView}
                >
                  <Image
                    style={styles.starIcon}
                    source={require("../assets/star.png")}
                  />
                  <Text
                    style={styles.starText}
                  >
                    {" "}
                    {recipe.review}
                  </Text>
                  <Text
                    style={styles.reviewText}
                  >
                    /5
                  </Text>
                </View>

                <View
                  style={styles.preparationView}
                >
                  <Image
                    style={styles.preparationIcon}
                    source={require("../assets/preparation.png")}
                  />
                  <Text
                    style={styles.preparationText}
                  >
                    {" "}
                    {recipe.prepTime}
                  </Text>
                  <Text
                    style={styles.minPrepText}
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
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
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
  cardRightSideView: {
    flex: 1.2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  recipeNameTextView: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  recipeNameTextStyle: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "flex-start",
  },
  textView: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 5,
  },
  starView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  starIcon: {
    height: 17,
    width: 17,
    marginRight: 3,
    marginTop: 0,
  },
  starText: {
    paddingTop: 5,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  reviewText: {
    paddingTop: 5,
    fontSize: 12,
    justifyContent: "flex-start",
  },
  preparationView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  preparationIcon: {
    height: 17,
    width: 17,
    marginRight: 3,
    marginTop: 0,
  },
  preparationText: {
    paddingTop: 5,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
  },
  minPrepText: {
    paddingTop: 5,
    fontSize: 12,
    justifyContent: "flex-start",
  },
  buttonContainerStyle: {
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 35,
  },
  buttonStyle: {
    margin: 10,
    width: 52,
    height: 52,
    shadowRadius: 10,
    backgroundColor: "white",
    borderRadius: 30,
  }
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
