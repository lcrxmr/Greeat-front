import Clock from "../components/clock";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import GoldStar from "../components/GoldStar";
import GreyStar from "../components/GreyStar";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function RecipeDetails({ route }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  var recipe = route.params.recipe;

  console.log("testID" + recipe);
  //const [recipe, setRecipe] = useState()
  
  /* useEffect(() => {
        fetch('http://172.17.188.13:3000/recipe?recipeID=' + recipeID, {
            method: 'GET'
        }).then(response => response.json()).then(data => setRecipe(data))

    }, []) */

  console.log(recipe);

  //! -------------------- Map ingredients --------------------


  var fullSteps = [];
    var Steps = [];
    fullSteps = recipe.description.split("\n");
    console.log(fullSteps);

    for (let i = 0; i < fullSteps.length; i++) {
      if (i % 2 != 0) {
        Steps.push(fullSteps[i]);
      }
    }

    var stepsView = Steps.map((item, i) => {
      return (
        <View 
        style={{
          marginLeft: 25
        }}
        >
          <Text
          style={styles.textStep}
          > • Step {i+1} </Text>
          <Text 
          style={styles.textItem}
          > {item} </Text>
        </View>
      );
    });

  let ingredientList = recipe.ingredients.map((item, i) => {
    var qty = item.qty + " " + item.unit;

    

    return (
      <View style={{ flexDirection: "row", height: "auto" }}>
        <View
          style={{
            flex: 0.5,
            alignItems: "flex-start",
            marginLeft: 10,
          }}
        >
          <Text
            style={styles.itemName}
          >
            {" "}
            • {item.name}
          </Text>
        </View>

        <View
          style={{
            flex: 0.5,
            alignItems: "flex-start",
            paddingBottom: 6,
            paddingLeft: 6,
          }}
        >
          <Text
            style={styles.qty}
          >
            {" "}
            {qty}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <ScrollView style={{ backgroundColor: "#FDFDFD" }}>
      {/* //! -------------------- Header image -------------------- */}

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={styles.image}
          source={require("../assets/photo2.jpg")}
        />
      </View>

      {/* //! -------------------- Reviews -------------------- */}

      <View
        style={styles.stars}
      >
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GoldStar />
        <GreyStar />
        <Text
          style={styles.rating}
        >
          {" "}
          4,5
        </Text>

        <Text
          style={styles.onRating}
        >
          /5
        </Text>
      </View>

      {/* //! -------------------- Card -------------------- */}

      <Card borderRadius={15} containerStyle={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={styles.cardView1}
          >
            <View
              style={styles.cardView2}
            >
              <Clock
                style={styles.clock}
              />

              <Text
                style={styles.recipeTime}
              >
                {" "}
                {recipe.prepTime}
              </Text>
              <Text
                style={styles.recipeText}
              >
                min to prepare
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              marginLeft: 50,
              justifyContent: "center",
            }}
          >
            <Text
              style={styles.createdBy}
            >
              Created by:
            </Text>
            <Text
              style={styles.creator}
            >
              Edgar Girerd
            </Text>
          </View>
        </View>
      </Card>

      {/* //! -------------------- Ingredients -------------------- */}

      <Text
        style={styles.ingredientList}
      >
        {" "}
        Ingredients list{" "}
      </Text>

      <View
        style={{
          marginTop: 10,
        }}
      >
        {ingredientList}
      </View>

      {/* //! -------------------- Preparation -------------------- */}

      <Text
        style={styles.preparation}
      >
        {" "}
        Preparation{" "}
      </Text>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            marginLeft: 10,
          }}
        >
           {stepsView}
          
        </View>
      </View>
    </ScrollView>
  );
}

//! ---------------------- STYLES ----------------------

const styles = StyleSheet.create({
  card: {
    marginLeft: 18,
    marginBottom: 10,
    marginTop: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 0,
  },
  textStep:{
    color: "#011936",
    lineHeight: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  textItem: {
    color: "#011936",
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10
  },
  itemName:{
    fontSize: 16,
    justifyContent: "flex-start",
    marginLeft: 25,
    marginBottom: 3,
    color: "#011936",
    fontFamily: "Poppins_400Regular",
  },
  qty: {
    fontSize: 16,
    justifyContent: "flex-start",
    marginLeft: 25,
    fontFamily: "Poppins_400Regular",
    color: "#486A6F",
  },
  image: {
    borderRadius: 10,
    height: 220,
    width: Dimensions.get("window").width * 0.95,
  },
  stars: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  rating: {
    paddingTop: 10,
    fontSize: 20,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 5,
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
  },
  onRating: {
    paddingTop: 8,
    fontSize: 12,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  clock:{
    height: 17,
    width: 17,
    marginRight: 3,
    marginTop: 0,
  },
  cardView1: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 15,
  },
  cardView2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
  },
  recipteTime: {
    paddingTop: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    marginRight: 3,
    marginBottom: 3,
    fontFamily: "Poppins_400Regular",
  },
  recipeText: {
    paddingTop: 8,
    color: "#AEB1B5",
    fontSize: 12,
    justifyContent: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
  createdBy: {
    fontSize: 16,
    marginRight: 3,
    fontFamily: "Poppins_400Regular",
    color: "#AEB1B5",
    fontSize: 12,
  },
  creator: {
    paddingTop: 0,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  ingredientList: {
    alignItems: "flex-start",
    marginTop: 25,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  preparation: {
    alignItems: "flex-start",
    marginTop: 25,
    color: "#8A8C90",
    marginLeft: 15,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

});
