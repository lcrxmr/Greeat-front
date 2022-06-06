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
export function MenuFocused({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={46} height={46} viewBox="0 0 46 46">
                  <Defs>
                    <LinearGradient id="linear-gradient" y1={1} x2={1} gradientUnits="objectBoundingBox">
                      <Stop offset={0} stopColor="#bcea64" />
                      <Stop offset={1} stopColor="#80c35f" />
                    </LinearGradient>
                  </Defs>
                  <G id="Group_47019" data-name="Group 47019" transform="translate(-299 -5)">
                    <Circle id="Ellipse_193" data-name="Ellipse 193" cx={23} cy={23} r={23} transform="translate(299 5)" fill="#f4f6f8" />
                    <G id="Group_673" data-name="Group 673" transform="translate(0 -4)">
                      <Rect id="Rectangle_3344" data-name="Rectangle 3344" width={20} height={20} transform="translate(313 22)" fill="none" />
                      <G id="group" transform="translate(310.716 21)">
                        <Circle id="Ellipse_171" data-name="Ellipse 171" cx={4} cy={4} r={4} transform="translate(10.284 2)" fill="#011936" />
                        <Path id="Path_1314" data-name="Path 1314" d="M12,13a6,6,0,0,0-6,6,2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V18a5,5,0,0,0-5-5Z" transform="translate(0.284 -1)" fill="#476a70" />
                        <Path id="Path_1315" data-name="Path 1315" d="M7,13a5,5,0,0,0-5,5v1a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V18a5,5,0,0,0-5-5Z" transform="translate(-2 -1)" fill="url(#linear-gradient)" />
                        <Circle id="Ellipse_172" data-name="Ellipse 172" cx={4} cy={4} r={4} transform="translate(4.284 2)" fill="url(#linear-gradient)" />
                      </G>
                    </G>
                  </G>
                </Svg>;
}
  