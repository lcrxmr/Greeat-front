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
    Text,
  } from "react-native-svg";
export function RecipesFocused({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={46} height={46} viewBox="0 0 46 46">
                  <Defs>
                    <LinearGradient id="linear-gradient" y1={1} x2={1} gradientUnits="objectBoundingBox">
                      <Stop offset={0} stopColor="#bcea64" />
                      <Stop offset={1} stopColor="#80c35f" />
                    </LinearGradient>
                  </Defs>
                  <G id="Group_47018" data-name="Group 47018" transform="translate(-208 -5)">
                    <Circle id="Ellipse_193" data-name="Ellipse 193" cx={23} cy={23} r={23} transform="translate(208 5)" fill="#f4f6f8" />
                    <Circle id="Ellipse_194" data-name="Ellipse 194" cx={5.5} cy={5.5} r={5.5} transform="translate(234.539 15.47)" fill="#011936" />
                    <G id="Group_47017" data-name="Group 47017" transform="translate(0 -3)">
                      <Path id="Path_1281" data-name="Path 1281" d="M5.3,4A3.327,3.327,0,0,0,2,7.353V18.529a3.327,3.327,0,0,0,3.3,3.353H8.629a6.506,6.506,0,0,1,2.087.344L13,23l2.284-.774a6.506,6.506,0,0,1,2.087-.344H20.7A3.327,3.327,0,0,0,24,18.529V7.353A3.327,3.327,0,0,0,20.7,4H16.3A4.36,4.36,0,0,0,13,5.513,4.36,4.36,0,0,0,9.7,4Z" transform="translate(218 19)" fillRule="evenodd" fill="url(#linear-gradient)" />
                      <Path id="Path_1282" data-name="Path 1282" d="M2,7.353A3.327,3.327,0,0,1,5.3,4H9.7A4.36,4.36,0,0,1,13,5.513V23l-2.284-.774a6.506,6.506,0,0,0-2.087-.344H5.3A3.327,3.327,0,0,1,2,18.529Z" transform="translate(218 19)" fill="#476a70" fillRule="evenodd" />
                    </G>
                  </G>
                </Svg>;
}
  