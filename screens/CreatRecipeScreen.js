import React, {useState} from "react"
import { View, TextInput, StyleSheet, Button,Text } from 'react-native';



 
export default function CreateRecepe(props) {
    const [text, setText] = useState("");
    const [ingredient,setIngredient] = useState("")
    const [desc, setDesc] = useState("");
   

    return ( 
        <View>
            
<TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeHolder={"Recipe Name"}

      />

<TextInput
        style={styles.input}
        onChangeText={setIngredient}
        value={text}
        placeHolder={""}

      ><Button>+</Button></TextInput>

<Text>Level difficulty</Text>


<TextInput
        style={styles.inputDesc}
        onChangeText={setDesc}
        value={text}
        placeHolder={"Description"}
      ><Button>+</Button></TextInput>
                                 {/* Cree un objet evenement sur le base de donner */}
<Button title = "Creat Recipe" titleStyle={{ fontSize: 8 }} containerStyle={{
                    justifyContent: "center", //Centered horizontally
                    alignItems: "center", //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20
                }}  onPress={() => {
                  props.navigation.navigate("MyEventScreen", { screen: "MyEventScreen" })
                }} />

                        {/*  aucune action : office de retour sur page my event
                         essayer de trouver un fonctionnaliter  */}
<Button title = "Cancel" titleStyle={{ fontSize: 8, color:'white'}}  containerStyle={{
                    justifyContent: "center", //Centered horizontally
                    alignItems: "center", //Centered vertically
                    flex: 1,
                    width: 30,
                    height: 20
                }}  onPress={() => {
                  props.navigation.navigate("MyEventScreen", { screen: "MyEventScreen" })
                }} />

      </View>
      
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