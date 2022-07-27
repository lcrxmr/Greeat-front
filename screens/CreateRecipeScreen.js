import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import SelectDropdown from "react-native-select-dropdown";


//create a new recipe in the DB

const handleCreate = (
  name,
  ingredientName,
  ingredientQty,
  ingredientUnit,
  desc
) => {
  console.log("length" + ingredientName.length);
  var ingredientList = [];

  var description = "";

  // create an array of steps from the recipe description 

  for (let i = 0; i < desc.length; i++) {
    let c = i + 1;
    description = description + "Step " + c + "\n" + desc[i] + "\n";
  }
  // ----------------------------------------------------

  for (let i = 0; i < ingredientName.length; i++) {
    ingredientList.push({
      name: ingredientName[i],
      qty: ingredientQty[i],
      unit: ingredientUnit[i],
    });
  }

  console.log(ingredientList);

  const body = {
    name: name,
    ingredients: ingredientList,
    description: description,
  };

  const formBody = Object.keys(body)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
    .join("&");

  fetch("https://damp-mountain-22575.herokuapp.com/create-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

function CreateRecipe(props) {
  const [name, setName] = useState("");
  const [ingredientName, setIngredientName] = useState([]);
  const [ingredientQty, setIngredientQty] = useState([]);
  const [ingredientUnit, setIngredientUnit] = useState([]);

  const [ingredientList, setIngredientList] = useState([]);

  const [desc, setDesc] = useState("");
  const [steps, setSteps] = useState([]);

  const [ingredientCount, setIngredientCount] = useState([]);
  const [stepCount, setStepCount] = useState(1);
  const [stepText, setStepText] = useState([]);

  console.log(stepText);


  // create field to fill with the step information 
  const addStep = () => {
    setStepCount(stepCount + 1);

    var step = (
      <View>
        <Text style={styles.inputText}> Step {stepCount} </Text>

        <TextInput
          style={[styles.input, { marginHorizontal: 10 }]}
          onChangeText={(text) => setStepText([...stepText, text])}
          placeholder={"Description"}
        ></TextInput>
      </View>
    );

    return step;
  };

  // create field to fill with the ingredient information 
  const addIngredient = () => {
    setIngredientCount(ingredientCount + 1);

    console.log(ingredientCount);

    var ingredient = (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View key={ingredientCount} style={{ flex: 3 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setIngredientName([...ingredientName, text])
            }
            placeholder={"Ingredients"}
          ></TextInput>
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, { fontSize: 12 }]}
            onChangeText={(text) => setIngredientQty([...ingredientQty, text])}
            keyboardType="numeric"
            placeholder={"Quantity"}
          ></TextInput>
        </View>

        <View style={{ flex: 1 }}>
          <SelectDropdown
            data={["mg", "g", "mL", "L"]}
            defaultValue="mg"
            buttonStyle={{
              width: "100%",
              marginTop: 10,
              height: 40,
              borderRadius: 20,
              padding: 5,
              backgroundColor: "#00000012",
              borderColor: "white",
            }}
            buttonTextStyle={{ fontSize: 14, color: "#8A8C90" }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setIngredientUnit([...ingredientUnit, selectedItem]);
            }}
          />
        </View>
      </View>
    );

    return ingredient;
  };


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>
        <Text style={styles.fieldName}> Images </Text>

        <View
          style={
            styles.imageField
          }
        >
          <TouchableHighlight
            onPress={() => {
              setIngredientList([
                ...ingredientList,
                {
                  name: ingredientName,
                  qty: ingredientQty,
                  unit: ingredientUnit,
                },
              ]);
            }}
          >
            <Text style={{ fontSize: 30 }}> + </Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.fieldName}> Recipe Name </Text>

        <TextInput
          style={[styles.input, { marginHorizontal: 10 }]}
          onChangeText={setName}
          value={name}
          placeholder={"Recipe Name"}
        />

        <Text style={styles.fieldName}> Ingredients </Text>

        {ingredientList}

        <View
          style={
            styles.viewAdd
          }
        >
          <Text style={{ flex: 4, margin: 5 }}> Add an ingredient </Text>
          <TouchableHighlight
            onPress={() => {

              setIngredientList([...ingredientList, addIngredient()]);
            }}
          >
            <Text style={{ fontSize: 30 }}> + </Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.fieldName}> Description </Text>

        {steps}

        <View
          style={styles.viewAdd}
        >
          <Text style={{ flex: 4, margin: 5 }}> Add a step</Text>
          <TouchableHighlight
            onPress={() => {
              setSteps([...steps, addStep()]);
            }}
          >
            <Text style={{ fontSize: 30 }}> + </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <TouchableHighlight onPress={() => { }}>
          <Text
            style={styles.buttonCancel}
          >
            {" "}
            Cancel{" "}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => {
            handleCreate(
              name,
              ingredientName,
              ingredientQty,
              ingredientUnit,
              stepText
            );
            props.addOneRecipe();

            props.navigation.navigate("Recipe", { screen: "RecipeScreen" });
          }}
        >
          <Text
            style={styles.buttonCreate}
          >
            {" "}
            Create Recipe{" "}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,

    padding: 10,
    backgroundColor: "#00000012",
    borderColor: "white",
  },
  screen: {
    backgroundColor: "white",
  },
  fieldName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#AEB1B5",
    marginLeft: 10,
    marginTop: 10,
  },
  inputText: {
    fontSize: 12,
    color: "#8A8C90",
    marginLeft: 20,
    marginTop: 10,
  },
  buttonCreate: {
    alignItems: "center",
    backgroundColor: "#476A70",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "white",
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
  },
  buttonCancel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#011936",
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
  },
  viewAdd: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C5CBD3",
    borderRadius: 20,
  },
  imageField: {
    alignItems: "center",
    margin: 10,
    padding: 30,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C5CBD3",
    borderRadius: 20,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addOneRecipe: function () {
      dispatch({ type: "add" });
    },
  };
}
export default connect(null, mapDispatchToProps)(CreateRecipe);
