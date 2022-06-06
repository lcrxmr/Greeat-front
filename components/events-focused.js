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
export function EventsFocused({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={46} height={46} viewBox="0 0 46 46">
                  <Defs>
                    <LinearGradient id="linear-gradient" y1={1} x2={1} gradientUnits="objectBoundingBox">
                      <Stop offset={0} stopColor="#bcea64" />
                      <Stop offset={1} stopColor="#80c35f" />
                    </LinearGradient>
                  </Defs>
                  <G id="Group_47016" data-name="Group 47016" transform="translate(-119 -5)">
                    <Circle id="Ellipse_192" data-name="Ellipse 192" cx={23} cy={23} r={23} transform="translate(119 5)" fill="#f4f6f8" />
                    <G id="Group_674" data-name="Group 674">
                      <Rect id="Rectangle_3353" data-name="Rectangle 3353" width={21} height={19} rx={3} transform="translate(131 20)" fill="url(#linear-gradient)" />
                      <Circle id="Ellipse_179" data-name="Ellipse 179" cx={6} cy={6} r={6} transform="translate(141 28)" fill="#011936" />
                      <Path id="Path_1344" data-name="Path 1344" d="M16.941,14a.941.941,0,0,1,.941.941v1.492l1.136,1.136a.941.941,0,1,1-1.33,1.33l-1.411-1.411A.941.941,0,0,1,16,16.822V14.941A.941.941,0,0,1,16.941,14Z" transform="translate(129.747 16.813)" fill="#80c35f" fillRule="evenodd" />
                      <Path id="Path_1345" data-name="Path 1345" d="M6.941,2a.941.941,0,0,1,.941.941V4.822A.941.941,0,1,1,6,4.822V2.941A.941.941,0,0,1,6.941,2Z" transform="translate(129.179 16)" fill="#476a70" fillRule="evenodd" />
                      <Path id="Path_1346" data-name="Path 1346" d="M16.941,2a.941.941,0,0,1,.941.941V4.822a.941.941,0,1,1-1.882,0V2.941A.941.941,0,0,1,16.941,2Z" transform="translate(129.624 16)" fill="#476a70" fillRule="evenodd" />
                    </G>
                  </G>
                </Svg>;
}
  