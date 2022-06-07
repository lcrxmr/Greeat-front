import React from "react";
import Svg, {
  G,
  Path,
  Circle,
  Rect,
  Defs,
  Stop,
  LinearGradient,
  TSpan,
} from "react-native-svg";
export function ProfileImg({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={109.179} height={109.179} viewBox="0 0 109.179 109.179" onPress={() => {
    props.navigation.navigate("ProfileFromMenu", {
      screen: "Profile"
    });
  }}>
    <Defs>
      <LinearGradient id="linear-gradient" y1={1} x2={1} gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#bcea64" />
        <Stop offset={1} stopColor="#80c35f" />
      </LinearGradient>
    </Defs>
    <G id="Group_47020" data-name="Group 47020" transform="translate(-125.58 -114.026)">
      <Circle id="Ellipse_207" data-name="Ellipse 207" cx={54.59} cy={54.59} r={54.59} transform="translate(125.58 114.026)" fill="#f4f6f8" />
      <G id="Group_892" data-name="Group 892" transform="translate(158.443 144.53)">
        <G id="group" transform="translate(0 0)">
          <Path id="Path_1315" data-name="Path 1315" d="M15.31,13A13.31,13.31,0,0,0,2,26.31v2.662A5.324,5.324,0,0,0,7.324,34.3H39.269a5.324,5.324,0,0,0,5.324-5.324V26.31A13.31,13.31,0,0,0,31.283,13Z" transform="translate(-2 13.765)" fill="url(#linear-gradient)" />
          <Circle id="Ellipse_172" data-name="Ellipse 172" cx={10.752} cy={10.752} r={10.752} transform="translate(11.84 0)" fill="url(#linear-gradient)" />
        </G>
      </G>
    </G>
  </Svg>;
}
  