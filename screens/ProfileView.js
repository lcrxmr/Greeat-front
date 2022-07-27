import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Card, Badge, Button } from "react-native-elements";
import { Image } from "react-native";
import React, { useState } from "react";
import Carousel from "simple-carousel-react-native";
import { Heart } from "./../components/heart";
import { connect } from "react-redux";

function Profile(props) {
  const [greeat, setGreeat] = useState(247);
  const [switchEventsButtonBgColor, setSwitchEventsButtonBgColor] =
    useState("#A8DD62");
  const [greeatClick, setGreeatClick] = useState(false);
  const [greatButtonBgColor, setGreeatButtonBgColor] = useState("#476A70");

  let piclist;
  console.log(props.pic)
  piclist = props.pic.map((url, i)=> {
    console.log('-------- image from reducer', piclist)
    return (
      <View style={{ borderRadius: 20 }}>
        <Image
       key={i}
       source={{ uri: url}}
       style={styles.images}
     />
      </View>
       
    );
  });

  let text = props.txt
  console.log(text)

  var onPressGreat = () => {
    setGreeatClick(!greeatClick);
    if (!greeatClick) {
      setGreeatButtonBgColor("#A8DD62");
      setGreeat(greeat + 1);
    } else {
      setGreeatButtonBgColor("#476A70");
      setGreeat(greeat - 1);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={styles.view1}
      >
        <Text
          style={styles.username}
        >
          John Doe{" "}
        </Text>
        <Text
          style={styles.greeat}
        >
          Greeats: {greeat}
          {/* //voir le onPress plus bas pour la valeur de 'greeat'  */}
        </Text>
       
      </View>
      <View style={{ alignItems: "center", borderRadius: 15 }}>
        <Carousel
          color={"#A8DD62"}
          dimmedColor={"#476A70"}
          backgroundColor={null}
          backgroundRadius={15}
          style={{ padding: 5 }}
        >
          
           {piclist}
         
        </Carousel>

        <Text
          style={styles.bio}
        >
          {text}
        </Text>

        <Button
          title="Greeat"
          // containerStyle={{
          //   shadowColor: "grey",
          //   shadowOffset: { width: 5, height: 10 },
          //   shadowOpacity: 0.2,
          //   shadowRadius: 10,
          //   elevation: 15,
          //   borderRadius: 25,
          // }}
          buttonStyle={{
            margin: 10,
            width: 170,
            height: 50,
            shadowRadius: 10,
            backgroundColor: switchEventsButtonBgColor,
            backgroundColor: greatButtonBgColor,
            borderRadius: 25,
            marginTop: 30,
          }}
          iconRight={true}
          icon={
            <Heart />
          }
          onPress={() => {
            setGreeat(greeat + 1);
            setSwitchEventsButtonBgColor("red");
            onPressGreat();
          }} // useState implement
        ></Button>
      </View>
    </ScrollView>
  );
}

function mapStateToProps(state) {
  // bien penser à appeler le state tel qu'il est nommé dans le store!
  return { pic: state.profilePic, txt: state.profileBio }
 }
 
 export default connect(
  mapStateToProps,
  null
 )(Profile);

const styles = StyleSheet.create({
 view1:{
  flexDirection: "row",
  marginTop: 10,
  justifyContent: "center",
  alignItems: "space-around",
},
username:{
  marginLeft: 20,
  marginBottom: 10,
  fontWeight: "400",
  fontSize: 20,
  color: "#476A70",
},
greeat:{
  marginLeft: "auto",
  marginRight: 20,
  marginBottom: 10,
  fontWeight: "400",
  opacity: 0.4,
},
images:{
  width: "100%",
  height: 340,
  borderRadius: 20,
},
bio:{
  marginLeft: 20,
  marginRight: 20,
  marginBottom: 20,
  marginTop: 40,
},
profilePic: {
  width: 80,
  height: 80,
  borderRadius: 20
}
});
