import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const BackArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={21.8}
    height={15.631}
    viewBox="0 0 21.8 15.631"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="linear-gradient"
        y1={1}
        x2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#bcea64" />
        <Stop offset={1} stopColor="#80c35f" />
      </LinearGradient>
    </Defs>
    <G
      id="Component_47_3"
      data-name="Component 47 \u2013 3"
      transform="translate(0 0)"
    >
      <Path
        id="Path_220"
        data-name="Path 220"
        d="M9,15.817a1.117,1.117,0,0,0,1.117,1.117H26.988l-4.793,4.793a1.117,1.117,0,1,0,1.579,1.579l6.7-6.7a1.106,1.106,0,0,0,.326-.784v0a1.088,1.088,0,0,0-.087-.427,1.106,1.106,0,0,0-.241-.362l-6.7-6.7a1.117,1.117,0,1,0-1.579,1.579l4.8,4.793H10.117A1.117,1.117,0,0,0,9,15.817Z"
        transform="translate(30.8 23.632) rotate(180)"
        fill="url(#linear-gradient)"
      />
    </G>
  </Svg>
);

export default BackArrow;
