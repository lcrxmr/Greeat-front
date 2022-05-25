import { Text, View, ScrollView } from "react-native";
import { Card, Badge, Button } from "react-native-elements";
import { Image } from "react-native";
import React, { useState } from "react";
import Carousel from "simple-carousel-react-native";
import ProfilePic from "../components/profilepic";
import Svg, { G, Path } from "react-native-svg";

export default function Profile() {
  const [greeat, setGreeat] = useState(0);
  const [switchEventsButtonBgColor, setSwitchEventsButtonBgColor] =
    useState("#A8DD62");
  const [greeatClick, setGreeatClick] = useState(false);
  const [greatButtonBgColor, setGreeatButtonBgColor] = useState("#476A70");

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
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "space-around",
        }}
      >
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "400",
            fontSize: 20,
            color: "#476A70",
          }}
        >
          John Doe{" "}
        </Text>
        <Text
          style={{
            marginLeft: "auto",
            marginRight: 20,
            marginBottom: 10,
            fontWeight: "400",
            opacity: 0.4,
          }}
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
          <View style={{ borderRadius: 20 }}>
            <Image
              source={require("../assets/photo1.jpg")}
              style={{
                width: "100%",
                height: 340,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Image
              source={require("../assets/photo2.jpg")}
              style={{
                width: "100%",
                height: 340,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Image
              source={require("../assets/photo3.jpg")}
              style={{
                width: "100%",
                height: 340,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Image
              source={require("../assets/photo4.jpg")}
              style={{
                width: "100%",
                height: 340,
                borderRadius: 20,
              }}
            />
          </View>
        </Carousel>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            marginTop: 40,
          }}
        >
          Un paragraphe est une section de texte en prose vouée au développement
          d'un point particulier souvent au moyen de plusieurs phrases, dans la
          continuité du précédent et du suivant. Sur le plan typographique, le
          paragraphe est compris entre deux alinéas, qui s'analysent aussi comme
          une « ponctuation blanche ».
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
            shadowRadius: 10,
            backgroundColor: switchEventsButtonBgColor,
            backgroundColor: greatButtonBgColor,
            borderRadius: 25,
            marginTop: 50,
          }}
          iconRight={true}
          icon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={13.146}
              height={11.888}
              marginLeft={20}
              viewBox="0 0 13.146 11.888"
            >
              <G
                id="Group_947"
                data-name="Group 947"
                transform="translate(-370.998 -32.764)"
              >
                <G
                  id="Group_14"
                  data-name="Group 14"
                  transform="translate(370.998 32.764)"
                >
                  <Path
                    id="Path_41"
                    data-name="Path 41"
                    d="M384,35.792a4.1,4.1,0,0,0-1.379-2.187,3.655,3.655,0,0,0-2.3-.842A3.6,3.6,0,0,0,377.57,34.1a3.6,3.6,0,0,0-2.757-1.335,3.653,3.653,0,0,0-2.3.842,4.1,4.1,0,0,0-1.379,2.187,5.368,5.368,0,0,0,.847,4.262,13.987,13.987,0,0,0,5.3,4.524.6.6,0,0,0,.572,0,14,14,0,0,0,5.3-4.524A5.367,5.367,0,0,0,384,35.792Zm-6.434,7.579"
                    transform="translate(-370.998 -32.764)"
                    fill="#bcea64"
                  />
                </G>
              </G>
            </Svg>
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
