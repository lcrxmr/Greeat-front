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
export function MapFocused({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
                  <Defs>
                    <LinearGradient id="linear-gradient" x2="1" y1="1" gradientUnits="objectBoundingBox">
                      <Stop offset="0" stopColor="#bcea64"></Stop>
                      <Stop offset="1" stopColor="#80c35f"></Stop>
                    </LinearGradient>
                  </Defs>
                  <G data-name="Group 47015" transform="translate(-28 -5)">
                    <Circle cx="23" cy="23" r="23" fill="#f4f6f8" data-name="Ellipse 180" transform="translate(28 5)"></Circle>
                    <G data-name="Group 327" transform="translate(-138.078 -10.958)">
                      <G data-name="Group 326" transform="translate(178.947 26.429)">
                        <Circle cx="5.5" cy="5.5" r="5.5" fill="#011936" data-name="Ellipse 34" transform="translate(12.67)"></Circle>
                        <Path fill="url(#linear-gradient)" d="M9.631 24.685c-.508 0-2.258-1.462-3.983-3.328a23.911 23.911 0 01-4.562-6.623A12.427 12.427 0 010 10.078 9.873 9.873 0 019.631 0a9.874 9.874 0 019.632 10.078 12.222 12.222 0 01-1.163 4.8c-1.732 4.022-7.391 9.807-8.469 9.807zm.16-19.121a3.884 3.884 0 103.858 3.883 3.875 3.875 0 00-3.858-3.882z" data-name="Subtraction 2" transform="translate(0 1.63)"></Path>
                      </G>
                    </G>
                  </G>
                </Svg>;
}
  