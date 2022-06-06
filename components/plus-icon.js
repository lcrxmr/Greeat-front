import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

export function PlusIcon({}) {
  return (
    <Svg
      id="Component_50_4"
      data-name="Component 50 \u2013 4"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={20}
      height={20}
      viewBox="0 0 16 16"
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
      <Path
        id="Path_900"
        data-name="Path 900"
        d="M19.857,14.143H14.143v5.714a1.143,1.143,0,0,1-2.286,0V14.143H6.143a1.143,1.143,0,1,1,0-2.286h5.714V6.143a1.143,1.143,0,1,1,2.286,0v5.714h5.714a1.143,1.143,0,0,1,0,2.286Z"
        transform="translate(-5 -5)"
        fill="url(#linear-gradient)"
      />
    </Svg>
  );
}
