import React, { useState, useEffect } from "react"
import { View, ScrollView, TextInput, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import SelectDropdown from 'react-native-select-dropdown'
import { Card, Badge, Button } from "react-native-elements";



const handleEdit = (recipe, name, ingredientName, ingredientQty, ingredientUnit, desc) => {

    console.log('length' + ingredientName.length)
    var ingredientList = []
  
    var description = '';
  
    for (let i = 0; i < desc.length; i++) {
      let c = i + 1
      description = description + 'Step ' + c + '\n' + desc[i] + '\n';
  
    }
  
  
    for (let i = 0; i < ingredientName.length; i++) {
  
  
  
      ingredientList.push({ name: ingredientName[i], qty: ingredientQty[i], unit: ingredientUnit[i] })
  
  
    }
  
  
    console.log(ingredientList)
    const body = {
        _id: recipe._id,
        name: name,
        ingredients: ingredientList,
        description: description,

    };

    console.log(body)

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

    fetch('http://172.16.190.132:3000/edit-recipe', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });


}

function EditRecipe(props) {


    var recipe = props.route.params.recipe;



    var fullSteps = [];
    var Steps = [];
    fullSteps = recipe.description.split('\n');
    console.log(fullSteps)
    for (let i = 0; i < fullSteps.length; i++) {

        if (i % 2 != 0) {
            Steps.push(fullSteps[i])
        }
    }

    console.log(Steps)



    const [name, setName] = useState(recipe.name);
    const [ingredientName, setIngredientName] = useState([])
    const [ingredientQty, setIngredientQty] = useState([])
    const [ingredientUnit, setIngredientUnit] = useState([])

    const [ingredientList, setIngredientList] = useState([])


    const [desc, setDesc] = useState("");
    const [steps, setSteps] = useState([]);


    const [ingredientCount, setIngredientCount] = useState([]);
    const [stepCount, setStepCount] = useState(1);
    const [stepText, setStepText] = useState(Steps);









    /*   useEffect(() => {
        setState(temp_state)
      }, [temp_state]) */

    /* const handleNameChange = (text, index) => {
  
  
      let temp_state = [...state];
  
      console.log(temp_state)
  
      let temp_element = { ...temp_state[index] };
  
  
      temp_element.name = text;
  
      temp_state[index] = temp_element;
  
      return temp_state
    } */



    const addStep = () => {

        setStepCount(steps.length + 1)

        var step = <View>

            <Text style={styles.inputText}>  Step {Steps.length + 1} </Text>

            <TextInput
                style={[styles.input, { marginHorizontal: 10 }]}
                onChangeText={text => setStepText([...stepText, text])}
                placeholder={"Description"}
            ></TextInput>

        </View>


        return step


    }


    var stepView = Steps.map((item, index) => {

        return (
            <View>

                <Text style={styles.inputText}>  Step {index + 1} </Text>

                <TextInput
                    style={[styles.input, { marginHorizontal: 10 }]}
                    //onChangeText={text => setStepText([...stepText, text])}
                    placeholder={"Description"}
                    value={item}
                ></TextInput>

            </View>

        )
    })




    var ingredientView = recipe.ingredients.map((item, i) => {

        return (<View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ flex: 3 }}>
                <TextInput
                    style={styles.input}
                    //onChangeText={text => setIngredientName([...ingredientName, text])}
                    placeholder={"Ingredients"}
                    value={item.name}
                >
                </TextInput>
            </View>

            <View style={{ flex: 1 }}>
                <TextInput
                    style={[styles.input, { fontSize: 12 }]}
                    //onChangeText={text => setIngredientQty([...ingredientQty, text])}
                    keyboardType='numeric'
                    placeholder={"Quantity"}
                    value={String(item.qty)}
                >
                </TextInput>
            </View >

            <View style={{ flex: 1 }}>
                <SelectDropdown
                    data={['mg', 'g', 'mL', 'L']}
                    defaultValue={item.unit}
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
                        setIngredientUnit([...ingredientUnit, selectedItem])
                    }} />

            </View>

        </View >)
    }
    )




    const addIngredient = () => {

        setIngredientCount(ingredientCount + 1)

        console.log(ingredientCount)

        var ingredient = <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>

            <View key={ingredientCount} style={{ flex: 3 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setIngredientName([...ingredientName, text])}
                    placeholder={"Ingredients"}
                >
                </TextInput>
            </View>

            <View style={{ flex: 1 }}>
                <TextInput
                    style={[styles.input, { fontSize: 12 }]}
                    onChangeText={text => setIngredientQty([...ingredientQty, text])}
                    keyboardType='numeric'
                    placeholder={"Quantity"}
                >
                </TextInput>
            </View >

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
                        setIngredientUnit([...ingredientUnit, selectedItem])
                    }} />

            </View>

        </View >

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

                {ingredientView}
                {ingredientList}

                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#C5CBD3', borderRadius: 20 }}>


                    <Text style={{ flex: 4, margin: 5 }}> Add an ingredient </Text>
                    <TouchableHighlight
                        onPress={() => {

                            //setAllIngredient([...allIngredient, { name: '', qty: 0, unit: '' }])

                            setIngredientList([...ingredientList, addIngredient()])


                        }} >
                        <Text style={{ fontSize: 30 }}> + </Text>
                    </TouchableHighlight>

                </View>



                <Text style={styles.fieldName}>  Description </Text>

                {stepView}
                {steps}

                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#C5CBD3', borderRadius: 20 }}>


                    <Text style={{ flex: 4, margin: 5 }}> Add a step
                    </Text>
                    <TouchableHighlight
                        onPress={() => {
                            setSteps([...steps, addStep()])

                        }} >
                        <Text style={{ fontSize: 30 }}> + </Text>
                    </TouchableHighlight>

                </View>


            </ScrollView >

            <View style={{
                flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', padding: 20, bottom: 10
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
<Button
          containerStyle={{
            shadowColor: "grey",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0,
            shadowRadius: 10,
            elevation: 15,
            borderRadius: 25,
            width: "auto",
          }}
          buttonStyle={{
            shadowRadius: 10,
            backgroundColor: '#476A70',
            borderRadius: 25,
            paddingTop: 8,
            paddingBottom: 8,
          }}
          titleStyle={{
            marginLeft: 20,
            marginRight: 20,
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 14
          }}
          title={'Update'}
          onPress={() => {

            handleEdit(recipe, name, ingredientName, ingredientQty, ingredientUnit, stepText);
            props.addOneRecipe();


            props.navigation.navigate("Recipes", { screen: "RecipeScreen" })
        }} 
        ></Button>


            </View>
        </View >

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
  export default connect(null, mapDispatchToProps)(EditRecipe);
