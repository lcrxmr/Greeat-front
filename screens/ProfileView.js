import { Text, View, ScrollView } from "react-native";
import { Card, Badge, Button } from "react-native-elements";
import { Image } from "react-native";
import React, { useState } from "react";
import Carousel from "simple-carousel-react-native";

export default function Profile() {

  const [greeat, setGreeat] = useState(0);
  const [switchEventsButtonBgColor, setSwitchEventsButtonBgColor] = useState("#A8DD62");

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ marginLeft: 20, marginBottom: 20 }}>UserName </Text>
          <Text
            style={{ marginLeft: "auto", marginRight: 20, marginBottom: 20 }}
          >
            Greeats: {greeat}
            {/* //voir le onPress plus bas pour la valeur de 'greeat'  */}
          </Text>
        </View>
        <Carousel >
          <View>
          <Image
          source={require('../assets/photo1.jpg')
          }
          style={{
            width: "100%",
            height: 500,
          }}
        />
          </View>

          <View>
          <Image
          source={require('../assets/photo2.jpg')}
          style={{
            width: "100%",
            height: 500,
          }}
        />
          </View>

          <View>
          <Image
          source={require('../assets/photo3.jpg')}
          style={{
            width: "100%",
            height: 500,
          }}
        />
          </View>

          <View>
          <Image
          source={require('../assets/photo4.jpg')}
          style={{
            width: "100%",
            height: 500,
          }}
        />
          </View>
        </Carousel>



        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            marginTop: 10,
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
            borderRadius: 25,
          }}
          onPress={() => {
            setGreeat(greeat + 1);
            setSwitchEventsButtonBgColor('red')
          }} // useState implement
        ></Button>
      </View>
    </ScrollView>
  );
}
